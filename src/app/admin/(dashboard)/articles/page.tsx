"use client";

import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Tag, Tooltip, Row, Col, Divider, Breadcrumb } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, FileImageOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { articles, animalTags } from '@/lib/data';
import CKEditor from '@/components/admin/CKEditor';

export default function ArticleManagement() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState([...articles]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => 
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

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        setData(data.map((item) => (item.id === editingId ? { ...item, ...values } : item)));
        message.success('Cập nhật bài viết thành công');
      } else {
        const newArticle = {
          ...values,
          id: Math.max(...data.map((a) => a.id), 0) + 1,
          slug: values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
          publishDate: values.publishDate || new Date().toLocaleDateString('vi-VN'),
        };
        setData([newArticle, ...data]);
        message.success('Thêm bài viết mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setData(data.filter((item) => item.id !== id));
        message.success('Đã xóa bài viết');
      },
    });
  };

  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
      width: '35%',
      render: (text: string, record: any) => (
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
        const animal = animalTags.find(a => a.slug === tag);
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
      render: (_: any, record: any) => (
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
            <Col span={16}>
              <Form.Item name="thumbnail" label="URL Hình đại diện (Thumbnail)">
                <Input prefix={<FileImageOutlined />} placeholder="/images/news-1.png" className="rounded-xl py-2 px-4" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="publishDate" label="Ngày đăng (dd/mm/yyyy)">
                <Input placeholder="Ví dụ: 20/03/2026" className="rounded-xl py-2 px-4" />
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
