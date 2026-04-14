"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message, Breadcrumb, Avatar, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const initialUsers = [
  { id: 1, name: 'Sanfovet Admin', email: 'admin@sanfovet.com.vn', role: 'SuperAdmin', lastActive: '10 phút trước', avatar: null },
  { id: 2, name: 'Editor 01', email: 'editor@sanfovet.com.vn', role: 'Editor', lastActive: '2 giờ trước', avatar: null },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Tài khoản',
      key: 'user',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: record.role === 'SuperAdmin' ? '#1a8c3f' : '#faad14' }} />
          <div>
            <div className="font-bold text-sanfovet-dark">{record.name}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'SuperAdmin' ? 'green' : 'gold'} className="font-black text-[10px] uppercase">
          {role}
        </Tag>
      ),
    },
    {
      title: 'Hoạt động lần cuối',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Đổi mật khẩu">
            <Button icon={<LockOutlined />} />
          </Tooltip>
          <Button type="primary" ghost icon={<EditOutlined />} />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            disabled={record.role === 'SuperAdmin'}
            onClick={() => setUsers(users.filter(u => u.id !== record.id))} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Người dùng' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight">Tài khoản Quản trị viên</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-lg font-bold"
          onClick={() => setIsModalOpen(true)}
        >
          Cấp tài khoản mới
        </Button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700">
          <SafetyCertificateOutlined />
          <span className="font-bold text-sm italic">Cảnh báo: Chỉ SuperAdmin mới có quyền tạo mới hoặc phân quyền cho các tài khoản khác.</span>
        </div>

        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="id" 
          pagination={false}
          className="border border-gray-50 rounded-xl overflow-hidden"
        />
      </div>

      <Modal
        title="Cấp mới tài khoản truy cập"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        okText="Tạo tài khoản"
        cancelText="Hủy"
      >
         <Form layout="vertical" className="mt-6">
            <Form.Item label="Họ và tên" required>
               <Input placeholder="VD: Nguyễn Văn A" />
            </Form.Item>
            <Form.Item label="Email đăng nhập" required>
               <Input placeholder="email@sanfovet.com.vn" />
            </Form.Item>
            <Form.Item label="Mật khẩu tạm thời" required>
               <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
            </Form.Item>
            <Form.Item label="Quyền hạn">
               <Select defaultValue="Editor">
                  <Select.Option value="SuperAdmin">SuperAdmin (Toàn quyền)</Select.Option>
                  <Select.Option value="Editor">Editor (Chỉ sửa nội dung)</Select.Option>
               </Select>
            </Form.Item>
         </Form>
      </Modal>
    </div>
  );
}
