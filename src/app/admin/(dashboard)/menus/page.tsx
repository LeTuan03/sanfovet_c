"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message, Breadcrumb, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, GlobalOutlined, LinkOutlined } from '@ant-design/icons';

const initialMenus = [
  { id: 1, name: 'Trang chủ', link: '/', parent: null, status: true },
  { id: 2, name: 'Sản phẩm', link: '/san-pham', parent: null, status: true },
  { id: 3, name: 'Kháng sinh tiêm', link: '/san-pham?cat=1', parent: 2, status: true },
  { id: 4, name: 'Thuốc bổ trợ', link: '/san-pham?cat=2', parent: 2, status: true },
  { id: 5, name: 'Giới thiệu', link: '/gioi-thieu', parent: null, status: true },
  { id: 6, name: 'Tin tức', link: '/tin-tuc', parent: null, status: true },
  { id: 7, name: 'Liên hệ', link: '/lien-he', parent: null, status: true },
];

export default function AdminMenusPage() {
  const [menus, setMenus] = useState(initialMenus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Tên hiển thị',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span style={{ paddingLeft: record.parent ? 32 : 0, fontWeight: record.parent ? 'normal' : 'bold' }}>
          {record.parent && <span className="text-gray-300 mr-2">└─</span>}
          {text}
        </span>
      ),
    },
    {
      title: 'Đường dẫn (Link)',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => <code className="text-xs text-primary">{link}</code>
    },
    {
      title: 'Vị trí',
      key: 'position',
      render: () => <Tag color="orange">Header Main</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => setMenus(menus.filter(m => m.id !== record.id))} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Menu' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight">Cấu trúc Menu Hệ thống</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-lg font-bold"
        >
          Thêm Menu mới
        </Button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center gap-3">
          <GlobalOutlined className="text-gray-400" />
          <span className="text-gray-500 text-sm">Chế độ xem phân cấp: Cho phép quản lý liên kết trên thanh điều hướng Header và Footer.</span>
        </div>

        <Table 
          columns={columns} 
          dataSource={menus} 
          rowKey="id" 
          pagination={false}
          className="border border-gray-50 rounded-xl overflow-hidden"
        />

        <Divider dashed />
        <div className="flex justify-end italic text-xs text-gray-400">
          * Kéo thả để thay đổi thứ tự menu (Tính năng đang phát triển)
        </div>
      </div>
    </div>
  );
}
