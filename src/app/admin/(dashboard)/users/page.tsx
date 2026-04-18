"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, Breadcrumb, Avatar, Tooltip, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, SafetyCertificateOutlined, SearchOutlined } from '@ant-design/icons';

const initialUsers = [
  { id: 1, name: 'Sanfovet Admin', email: 'admin@sanfovet.com.vn', role: 'SuperAdmin', lastActive: '10 phút trước', avatar: null },
  { id: 2, name: 'Editor 01', email: 'editor@sanfovet.com.vn', role: 'Editor', lastActive: '2 giờ trước', avatar: null },
];

function AdminUsersPageContent() {
  const { message: msg, modal } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();

  // Derived filtered data
  const filteredData = useMemo(() => {
    return users.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.role.toLowerCase().includes(query.toLowerCase())
    );
  }, [users, query]);

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
      setSelectedUser(record);
      form.setFieldsValue(record);
    } else {
      setSelectedUser(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (selectedUser && !isPassModalOpen) {
        setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...values } : u)));
        msg.success('Cập nhật tài khoản thành công');
      } else {
        const newUser = {
          ...values,
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          lastActive: 'Vừa xong',
          avatar: null,
        };
        setUsers([...users, newUser]);
        msg.success('Thêm tài khoản mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  const handleOpenPassModal = (record: any) => {
    setSelectedUser(record);
    passForm.resetFields();
    setIsPassModalOpen(true);
  };

  const handleChangePassword = () => {
    passForm.validateFields().then(() => {
      msg.success(`Đã đổi mật khẩu cho tài khoản ${selectedUser.email}`);
      setIsPassModalOpen(false);
    });
  };

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
            <Button icon={<LockOutlined />} onClick={() => handleOpenPassModal(record)} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="primary" ghost icon={<EditOutlined />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
                danger 
                icon={<DeleteOutlined />} 
                disabled={record.role === 'SuperAdmin'}
                onClick={() => {
                   modal.confirm({
                      title: 'Xác nhận xóa tài khoản?',
                      content: `Bạn có chắc muốn xóa tài khoản ${record.name}?`,
                      okText: 'Xóa ngay',
                      cancelText: 'Hủy',
                      okType: 'danger',
                      onOk: () => {
                         setUsers(users.filter(u => u.id !== record.id));
                         msg.success('Đã xóa tài khoản');
                      }
                   });
                }} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin', href: '/admin' }, { title: 'Quản lý Người dùng' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight">Tài khoản Quản trị viên</h1>
        </div>
        <div className="flex gap-4">
           <Input 
              prefix={<SearchOutlined className="text-gray-300" />} 
              placeholder="Tìm kiếm user..." 
              className="w-64 rounded-xl border-gray-100 shadow-sm"
              defaultValue={query}
              onChange={handleSearch}
           />
           <Button 
             type="primary" 
             icon={<PlusOutlined />} 
             size="large"
             className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
             onClick={() => showModal()}
           >
             Cấp tài khoản mới
           </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700">
          <SafetyCertificateOutlined />
          <span className="font-bold text-sm italic">Cảnh báo: Chỉ SuperAdmin mới có quyền tạo mới hoặc phân quyền cho các tài khoản khác.</span>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id" 
          pagination={{
            current: page,
            pageSize: 10,
            onChange: (p) => updateUrl({ page: p })
          }}
          className="border border-gray-50 rounded-xl overflow-hidden"
        />
      </div>

      <Modal
        title={selectedUser ? "Cập nhật tài khoản" : "Cấp mới tài khoản truy cập"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText={selectedUser ? "Cập nhật" : "Tạo tài khoản"}
        cancelText="Hủy"
      >
         <Form form={form} layout="vertical" className="mt-6">
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
               <Input placeholder="VD: Nguyễn Văn A" />
            </Form.Item>
            <Form.Item label="Email đăng nhập" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}>
               <Input placeholder="email@sanfovet.com.vn" />
            </Form.Item>
            {!selectedUser && (
              <Form.Item label="Mật khẩu tạm thời" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                 <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
              </Form.Item>
            )}
            <Form.Item label="Quyền hạn" name="role" initialValue="Editor">
               <Select>
                  <Select.Option value="SuperAdmin">SuperAdmin (Toàn quyền)</Select.Option>
                  <Select.Option value="Editor">Editor (Chỉ sửa nội dung)</Select.Option>
               </Select>
            </Form.Item>
         </Form>
      </Modal>

      <Modal
        title={<span>Đổi mật khẩu cho <b>{selectedUser?.name}</b></span>}
        open={isPassModalOpen}
        onOk={handleChangePassword}
        onCancel={() => setIsPassModalOpen(false)}
        okText="Cập nhật mật khẩu"
        cancelText="Bỏ qua"
      >
         <Form form={passForm} layout="vertical" className="mt-6">
            <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true, min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' }]}>
               <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" dependencies={['newPassword']} rules={[
               { required: true, message: 'Vui lòng xác nhận mật khẩu' },
               ({ getFieldValue }) => ({
                  validator(_, value) {
                     if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                     }
                     return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
               }),
            ]}>
               <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
            </Form.Item>
         </Form>
      </Modal>
    </div>
  );
}


export default function AdminUsersPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <AdminUsersPageContent />
    </React.Suspense>
  );
}
