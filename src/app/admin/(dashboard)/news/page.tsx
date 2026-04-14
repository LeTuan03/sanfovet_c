"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Input, Modal, Form, Select, Switch, message, Breadcrumb } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';
import { articles } from '@/lib/data';
import CKEditor from '@/components/admin/CKEditor';

const { Search } = Input;

export default function AdminNewsPage() {
  const [news, setNews] = useState(articles.filter(a => a.category === 'tin-noi-bo' || a.category === 'tin-nganh'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => <img src={text} alt="news" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: 'Phân loại',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const color = category === 'tin-noi-bo' ? 'blue' : 'green';
        const label = category === 'tin-noi-bo' ? 'Tin nội bộ' : 'Tin ngành';
        return <Tag color={color}>{label}</Tag>;
      },
      filters: [
        { text: 'Tin nội bộ', value: 'tin-noi-bo' },
        { text: 'Tin ngành', value: 'tin-nganh' },
      ],
      onFilter: (value: any, record: any) => record.category === value,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: () => <Switch defaultChecked />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button 
            type="primary" 
            ghost 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    setEditingNews(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setNews(news.filter(item => item.id !== id));
        message.success('Đã xóa thành công');
      },
    });
  };

  const handleAdd = () => {
    setEditingNews(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingNews) {
        setNews(news.map(item => item.id === editingNews.id ? { ...item, ...values } : item));
        message.success('Cập nhật thành công');
      } else {
        const newEntry = {
          id: news.length + 1,
          slug: values.title.toLowerCase().replace(/ /g, '-'),
          ...values,
          publishDate: new Date().toLocaleDateString('vi-VN'),
          thumbnail: '/images/news-1.png',
        };
        setNews([newEntry, ...news]);
        message.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb 
            items={[
              { title: 'Admin' },
              { title: 'Quản lý Tin tức' },
            ]} 
          />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2">Quản lý Tin tức</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-lg font-bold"
          onClick={handleAdd}
        >
          Thêm tin tức mới
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6 flex gap-4">
          <Search 
            placeholder="Tìm kiếm theo tiêu đề..." 
            allowClear 
            enterButton={<SearchOutlined />} 
            size="large"
            className="max-w-md"
          />
          <Select 
            defaultValue="all" 
            style={{ width: 200 }} 
            size="large"
            options={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'published', label: 'Đã đăng' },
              { value: 'draft', label: 'Bản nháp' },
            ]}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={news} 
          rowKey="id"
          pagination={{ pageSize: 8 }}
          className="border border-gray-50 rounded-lg overflow-hidden"
        />
      </div>

      <Modal
        title={editingNews ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        okText="Lưu lại"
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            name="title"
            label="Tiêu đề bài viết"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input size="large" placeholder="Nhập tiêu đề tin tức..." />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Chuyên mục tin tức"
              rules={[{ required: true, message: 'Vui lòng chọn chuyên mục' }]}
            >
              <Select size="large" placeholder="Chọn loại tin...">
                <Select.Option value="tin-noi-bo">Tin nội bộ Sanfovet</Select.Option>
                <Select.Option value="tin-nganh">Tin ngành chăn nuôi - thú y</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="status"
              label="Trạng thái"
              initialValue={true}
              valuePropName="checked"
            >
              <Switch checkedChildren="Hiển thị" unCheckedChildren="Ẩn" />
            </Form.Item>
          </div>

          <Form.Item
            name="excerpt"
            label="Mô tả ngắn (Trích dẫn)"
          >
            <Input.TextArea rows={3} placeholder="Nhập đoạn mô tả ngắn cho bài viết..." />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung chi tiết"
          >
            <CKEditor placeholder="Nhập nội dung chi tiết bài viết..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
