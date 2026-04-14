"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Tabs, message, Tag, Breadcrumb, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, AppstoreOutlined, TagsOutlined } from '@ant-design/icons';
import { categories as initialCategories, animalTags as initialAnimalTags } from '@/lib/data';

export default function CategoryAndTagManagement() {
  const [categories, setCategories] = useState([...initialCategories]);
  const [animalTags, setAnimalTags] = useState([...initialAnimalTags]);
  const [activeTab, setActiveTab] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  const showModal = (record?: any) => {
    if (record) {
      setEditingItem(record);
      form.setFieldsValue(record);
    } else {
      setEditingItem(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (activeTab === '1') {
        // Handle Product Categories
        if (editingItem) {
          setCategories(categories.map((item) => (item.id === editingItem.id ? { ...item, ...values } : item)));
          message.success('Cập nhật danh mục thành công');
        } else {
          const newItem = {
            ...values,
            id: Math.max(...categories.map((c) => c.id), 0) + 1,
            slug: values.slug || values.name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
          };
          setCategories([...categories, newItem]);
          message.success('Thêm danh mục mới thành công');
        }
      } else {
        // Handle Animal Tags
        if (editingItem) {
          setAnimalTags(animalTags.map((item) => (item.id === editingItem.id ? { ...item, ...values } : item)));
          message.success('Cập nhật loài vật thành công');
        } else {
          const newItem = {
            ...values,
            id: Math.max(...animalTags.map((c) => c.id), 0) + 1,
            slug: values.slug || values.name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
            icon: values.icon || '🐾',
          };
          setAnimalTags([...animalTags, newItem]);
          message.success('Thêm loài vật mới thành công');
        }
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Việc xóa phân loại này có thể ảnh hưởng đến hiển thị của các sản phẩm/bài viết liên quan. Bạn có chắc chắn?',
      okText: 'Xóa',
      okType: 'danger',
      onOk: () => {
        if (activeTab === '1') {
          setCategories(categories.filter((cat) => cat.id !== id));
        } else {
          setAnimalTags(animalTags.filter((tag) => tag.id !== id));
        }
        message.success('Đã xóa thành công');
      },
    });
  };

  const categoryColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name', render: (text: string) => <span className="font-bold text-gray-800">{text}</span> },
    { title: 'Slug (URL)', dataIndex: 'slug', key: 'slug', render: (text: string) => <code className="text-xs text-primary bg-primary-light px-2 py-1 rounded-md">{text}</code> },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="text" onClick={() => showModal(record)} className="text-blue-500" />
          <Button icon={<DeleteOutlined />} type="text" danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  const tagColumns = [
    { title: 'Icon', dataIndex: 'icon', key: 'icon', width: 60, render: (icon: string) => <span className="text-xl">{icon}</span> },
    { title: 'Tên loài vật', dataIndex: 'name', key: 'name', render: (text: string) => <span className="font-black text-sanfovet-dark">{text}</span> },
    { title: 'Slug (URL)', dataIndex: 'slug', key: 'slug', render: (text: string) => <code className="text-xs text-gray-500">{text}</code> },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="text" onClick={() => showModal(record)} className="text-blue-500" />
          <Button icon={<DeleteOutlined />} type="text" danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Phân loại' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight uppercase italic">Quản lý Phân loại & Tag</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-xl font-bold px-6"
          onClick={() => showModal()}
        >
          {activeTab === '1' ? 'Thêm Danh mục mới' : 'Thêm Loài vật mới'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="admin-custom-tabs"
          items={[
            {
              key: '1',
              label: <span className="flex items-center gap-2 font-bold px-4 uppercase text-[0.7rem] tracking-widest"><AppstoreOutlined /> Danh mục Sản phẩm</span>,
              children: (
                <div className="py-4">
                  <Table 
                    columns={categoryColumns} 
                    dataSource={categories} 
                    rowKey="id" 
                    pagination={false}
                    className="border border-gray-50 rounded-2xl overflow-hidden" 
                  />
                </div>
              ),
            },
            {
              key: '2',
              label: <span className="flex items-center gap-2 font-bold px-4 uppercase text-[0.7rem] tracking-widest"><TagsOutlined /> Loài vật (Handbook)</span>,
              children: (
                <div className="py-4">
                  <Table 
                    columns={tagColumns} 
                    dataSource={animalTags} 
                    rowKey="id" 
                    pagination={false}
                    className="border border-gray-50 rounded-2xl overflow-hidden"
                  />
                </div>
              ),
            },
          ]}
        />
      </div>

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingItem ? 'Chỉnh sửa' : 'Thêm mới'} Phân loại</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu lại"
        cancelText="Hủy bỏ"
        className="rounded-[32px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Form.Item name="name" label="Tên gọi" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input className="rounded-xl py-3 px-4 font-bold" placeholder="Ví dụ: Gà, Heo, Thuốc bổ..." />
          </Form.Item>
          <Form.Item name="slug" label="Slug (URL - Tùy chọn)" help="Lưu ý: Nếu để trống hệ thống sẽ tự sinh dựa trên tên gọi.">
            <Input className="rounded-xl py-2 px-4" placeholder="vi-du-ga" />
          </Form.Item>
          {activeTab === '2' && (
            <>
              <Form.Item name="icon" label="Biểu tượng (Emoji)" initialValue="🐾">
                <Input className="rounded-xl py-2 px-4 w-20 text-center text-xl" />
              </Form.Item>
              <Form.Item name="description" label="Mô tả ngắn">
                <Input.TextArea rows={3} className="rounded-xl p-4" placeholder="Mô tả cho loài vật này trong cẩm nang..." />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}
