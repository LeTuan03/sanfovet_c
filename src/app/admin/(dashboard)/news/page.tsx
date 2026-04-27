"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Tag, Input, Modal, Form, Select, Switch, Tooltip, Row, Col, App, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { motion } from 'framer-motion';
import { adminFetch } from '@/lib/api';
import { Article } from '@/types';
import CKEditor from '@/components/admin/CKEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import { useAdminLoading } from '@/lib/AdminLoadingContext';

function AdminNewsPageContent() {
  const { modal, message } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<Article | null>(null);
  const [form] = Form.useForm();

  // Load data from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await adminFetch('/api/data/articles');
        const data = await res.json();
        setAllArticles(data || []);
      } catch (error) {
        message.error('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [message]);

  // Derived news list
  const news = useMemo(() => {
     return allArticles.filter((a: Article) => a.category === 'tin-noi-bo' || a.category === 'tin-nganh');
  }, [allArticles]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return news.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [news, query]);

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

  const columns = [
    {
      title: 'Bài viết',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shrink-0 shadow-sm group-hover:shadow-md transition-all">
             <img src={record.thumbnail} alt={text} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-biotechvet-dark text-sm line-clamp-1">{text}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{record.publishDate}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Chuyên mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const isInternal = category === 'tin-noi-bo';
        return (
          <Tag className={`font-black px-3 py-1 rounded-lg uppercase text-[10px] border-none m-0 tracking-wider shadow-sm ${isInternal ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {isInternal ? 'Tin nội bộ' : 'Tin ngành'}
          </Tag>
        );
      },
    },
    {
      title: 'Hiển thị',
      key: 'status',
      render: () => <Switch defaultChecked size="small" className="bg-gray-200" />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
             <Button icon={<EyeOutlined />} type="text" className="text-gray-400 hover:text-primary hover:bg-emerald-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all" />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleEdit(record)} 
             />
          </Tooltip>
          <Tooltip title="Xóa">
             <Button 
               icon={<DeleteOutlined />} 
               type="text" 
               danger 
               className="hover:bg-red-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleDelete(record.id)} 
             />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    setEditingNews(record);
    form.setFieldsValue({
      ...record,
      publishDate: record.publishDate ? dayjs(record.publishDate, 'DD/MM/YYYY') : dayjs(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        const newData = allArticles.filter((item: Article) => item.id !== id);
        setGlobalLoading(true);
        try {
          const res = await adminFetch('/api/data/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
          });
          if (res.ok) {
            setAllArticles(newData);
            message.success('Đã xóa bài viết thành công');
          } else {
            throw new Error();
          }
        } catch (error) {
          message.error('Lỗi khi xóa dữ liệu');
        } finally {
          setGlobalLoading(false);
        }
      },
    });
  };

  const handleAdd = () => {
    setEditingNews(null);
    form.resetFields();
    form.setFieldsValue({
      publishDate: dayjs(),
    });
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      const formattedValues = {
        ...values,
        publishDate: values.publishDate ? values.publishDate.format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY'),
      };
      
      let newData = [];
      if (editingNews) {
        newData = allArticles.map((item: Article) => (item.id === editingNews.id ? { ...item, ...formattedValues } : item));
      } else {
        const newEntry = {
          ...formattedValues,
          id: Math.max(...allArticles.map((a: Article) => a.id), 0) + 1,
          slug: values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
        };
        newData = [newEntry, ...allArticles];
      }

      // Save to API
      setGlobalLoading(true);
      try {
        const res = await adminFetch('/api/data/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (res.ok) {
          setAllArticles(newData);
          message.success(editingNews ? 'Cập nhật thành công' : 'Thêm mới thành công');
          setIsModalOpen(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        message.error('Lỗi khi lưu dữ liệu');
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <AdminPageHeader 
        title="Quản lý Tin tức"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Quản lý Tin tức' },
        ]}
        onSearch={(val) => updateUrl({ q: val })}
        primaryAction={{
          label: 'Thêm tin tức mới',
          onClick: handleAdd,
          icon: <PlusOutlined />
        }}
      />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          loading={loading}
          pagination={{ 
            current: page,
            pageSize: 8,
            className: "p-6 border-t border-gray-50",
            onChange: (p) => updateUrl({ page: p })
          }}
          className="admin-table"
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {editingNews ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-biotechvet-dark">
              {editingNews ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}
            </span>
          </div>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={900}
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        centered
        okText={editingNews ? "Cập nhật bài viết" : "Đăng bài ngay"}
        cancelText="Hủy bỏ"
        okButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px] border-none shadow-lg shadow-primary/20" }}
        cancelButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px]" }}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-6 px-4"
        >
          <Form.Item
            name="title"
            label="Tiêu đề bài viết"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input className="rounded-xl py-2 font-bold" placeholder="Nhập tiêu đề tin tức..." />
          </Form.Item>
          
          <Row gutter={24}>
            <Col span={14}>
              <Form.Item
                name="category"
                label="Chuyên mục tin tức"
                rules={[{ required: true, message: 'Vui lòng chọn chuyên mục' }]}
              >
                <Select className="w-full" placeholder="Chọn loại tin...">
                  <Select.Option value="tin-noi-bo">Tin nội bộ biotechvet</Select.Option>
                  <Select.Option value="tin-nganh">Tin ngành chăn nuôi - thú y</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="publishDate"
                label="Ngày đăng bài"
                rules={[{ required: true, message: 'Vui lòng chọn ngày đăng' }]}
              >
                <DatePicker className="w-full rounded-xl" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="status"
                label="Hiển thị"
                initialValue={true}
                valuePropName="checked"
              >
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
             name="thumbnail"
             label="Hình ảnh bài viết"
          >
             <ImageUpload label="Chọn ảnh đại diện" aspectRatio="16/9" />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="Mô tả ngắn (Trích dẫn)"
          >
            <Input.TextArea rows={3} className="rounded-xl p-3" placeholder="Nhập đoạn mô tả ngắn cho bài viết..." />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung chi tiết"
          >
            <CKEditor placeholder="Nhập nội dung chi tiết bài viết..." />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
}


export default function AdminNewsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <AdminNewsPageContent />
    </React.Suspense>
  );
}
