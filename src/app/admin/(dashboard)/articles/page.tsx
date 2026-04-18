"use client";

import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Tag, Tooltip, Row, Col, Divider, Breadcrumb, DatePicker, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, FileImageOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import { articles, animalTags } from '@/lib/data'; // Removed static imports
import CKEditor from '@/components/admin/CKEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { adminFetch } from '@/lib/api';
import { Article, AnimalTag } from '@/types';

export default function ArticleManagement() {
  const { message: msg, modal } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState<Article[]>([]);
  const [animalTags, setAnimalTags] = useState<AnimalTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load data from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [artRes, tagRes] = await Promise.all([
          adminFetch('/api/data/articles'),
          adminFetch('/api/data/animal-tags')
        ]);
        const artData = await artRes.json();
        const tagData = await tagRes.json();
        setData(artData);
        setAnimalTags(tagData);
      } catch (error) {
        msg.error('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [msg]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter((item: Article) => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  const updateUrl = (params: { q?: string; page?: number }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    if (params.q !== undefined) {
      if (params.q) newSearchParams.set('q', params.q);
      else newSearchParams.delete('q');
      newSearchParams.set('page', '1'); // Reset to page 1 on search
    }
    
    if (params.page !== undefined) {
      newSearchParams.set('page', params.page.toString());
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrl({ q: e.target.value });
  };

  const showModal = (record?: Article) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        ...record,
        publishDate: record.publishDate ? dayjs(record.publishDate, 'DD/MM/YYYY') : dayjs(),
      });
    } else {
      setEditingId(null);
      form.resetFields();
      form.setFieldsValue({
        publishDate: dayjs(),
      });
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const formattedValues = {
        ...values,
        publishDate: values.publishDate ? values.publishDate.format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY'),
      };

      let newData = [];
      if (editingId) {
        newData = data.map((item: Article) => (item.id === editingId ? { ...item, ...formattedValues } : item));
      } else {
        const newArticle = {
          ...formattedValues,
          id: Math.max(...data.map((a: Article) => a.id), 0) + 1,
          slug: values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
        };
        newData = [newArticle, ...data];
      }

      // Save to API
      try {
        const res = await adminFetch('/api/data/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (res.ok) {
          setData(newData);
          msg.success(editingId ? 'Cập nhật bài viết thành công' : 'Thêm bài viết mới thành công');
          setIsModalOpen(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        msg.error('Lỗi khi lưu dữ liệu');
      }
    });
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        const newData = data.filter((item: Article) => item.id !== id);
        try {
          const res = await adminFetch('/api/data/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
          });
          if (res.ok) {
            setData(newData);
            msg.success('Đã xóa bài viết');
          } else {
            throw new Error();
          }
        } catch (error) {
          msg.error('Lỗi khi xóa dữ liệu');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
      width: '35%',
      render: (text: string, record: Article) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
             <img src={record.thumbnail} alt={text} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-gray-800 line-clamp-2 leading-tight">{text}</span>
        </div>
      ),
    },
    {
      title: 'Chuyên mục',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => {
        const colors: any = { 'benh-dieu-tri': 'red', 'cam-nang': 'blue', 'tin-noi-bo': 'green', 'tin-nganh': 'orange' };
        const labels: any = { 'benh-dieu-tri': 'Bệnh học', 'cam-nang': 'Cẩm nang', 'tin-noi-bo': 'Tin nội bộ', 'tin-nganh': 'Tin ngành' };
        return <Tag color={colors[cat] || 'default'} className="font-bold px-3 py-0.5 rounded-full uppercase text-[0.6rem]">{labels[cat] || cat}</Tag>;
      },
    },
    {
      title: 'Loài vật',
      dataIndex: 'animalTag',
      key: 'animalTag',
      render: (tag: string) => {
        if (!tag) return <span className="text-gray-300 italic text-[0.7rem]">-</span>;
        const animal = animalTags.find((a: AnimalTag) => a.slug === tag);
        return (
          <div className="flex items-center gap-1">
            <span className="text-lg">{animal?.icon}</span>
            <span className="text-xs font-bold text-gray-500">{animal?.name || tag}</span>
          </div>
        );
      }
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'publishDate',
      key: 'publishDate',
      render: (d: string) => <span className="font-medium text-gray-400 text-xs uppercase tracking-widest">{d}</span>
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Article) => (
        <Space size="middle">
          <Tooltip title="Xem bài viết">
             <Button icon={<EyeOutlined />} type="text" className="text-gray-400 hover:text-primary" />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50"
               onClick={() => showModal(record)} 
             />
          </Tooltip>
          <Tooltip title="Xóa">
             <Button 
               icon={<DeleteOutlined />} 
               type="text" 
               danger 
               className="hover:bg-red-50"
               onClick={() => handleDelete(record.id)} 
             />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const isCamNang = Form.useWatch('category', form) === 'cam-nang';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div>
           <Breadcrumb 
             items={[
               { title: 'Admin', href: '/admin' },
               { title: 'Quản lý bài viết' },
             ]} 
             className="mb-2"
           />
           <h2 className="text-2xl font-black text-sanfovet-dark uppercase tracking-tight italic">Bài viết & Cẩm nang</h2>

        </div>
        <div className="flex gap-4">
           <Input 
              prefix={<SearchOutlined className="text-gray-300" />} 
              placeholder="Tìm bài viết..." 
              className="w-64 rounded-xl border-gray-100 shadow-sm shadow-black/[0.02]"
              defaultValue={query}
              onChange={handleSearch}
           />
           <Button 
             type="primary" 
             icon={<PlusOutlined />} 
             onClick={() => showModal()}
             className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
           >
             Viết bài mới
           </Button>
        </div>
      </div>

      <Table 
         columns={columns} 
         dataSource={filteredData} 
         rowKey="id" 
         loading={loading}
         className="shadow-sm border border-gray-50 rounded-2xl overflow-hidden bg-white"
         pagination={{
            current: page,
            pageSize: 6,
            className: "px-6 pb-4",
            onChange: (p) => updateUrl({ page: p })
         }}
      />

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingId ? 'Chỉnh sửa Bài viết' : 'Soạn thảo Bài viết mới'}</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        centered
        okText="Xuất bản ngay"
        cancelText="Lưu bản nháp"
        className="rounded-[32px] top-[40px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="title" label="Tiêu đề bài viết" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                <Input placeholder="Tiêu đề bắt mắt..." className="rounded-xl py-3 px-4 font-bold text-lg" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="Chuyên mục" rules={[{ required: true }]}>
                <Select 
                  className="rounded-xl" 
                  placeholder="Chọn loại bài"
                  options={[
                    { label: 'Bệnh & Điều trị', value: 'benh-dieu-tri' },
                    { label: 'Cẩm nang chăn nuôi', value: 'cam-nang' },
                    { label: 'Tin nội bộ', value: 'tin-noi-bo' },
                    { label: 'Tin ngành', value: 'tin-nganh' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6} hidden={Boolean(!isCamNang)}>
               <Form.Item name="animalTag" label="Loài vật liên quan">
                 <Select 
                   className="rounded-xl" 
                   placeholder="Chọn loài vật"
                   allowClear
                   options={animalTags.map(tag => ({
                     label: <span>{tag.icon} {tag.name}</span>,
                     value: tag.slug
                   }))}
                 />
               </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={14}>
              <Form.Item name="thumbnail" label="Hình đại diện (Thumbnail)">
                <ImageUpload label="Tải ảnh đại diện" aspectRatio="16/9" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="publishDate" label="Ngày đăng bài">
                <DatePicker className="w-full rounded-xl py-2" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider><span className="text-[0.6rem] font-black text-gray-300 uppercase tracking-[3px]">Nội dung truyền thông</span></Divider>

          <Form.Item name="excerpt" label="Tóm tắt ngắn (Excerpt)">
            <Input.TextArea rows={2} className="rounded-xl p-4 font-medium" placeholder="Viết mô tả ngắn để thu hút người đọc..." />
          </Form.Item>

          <Form.Item name="content" label="Nội dung chuyên sâu (Tối ưu SEO - CKEditor)">
            <CKEditor placeholder="Bắt đầu viết nội dung chuyên sâu..." />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
}
