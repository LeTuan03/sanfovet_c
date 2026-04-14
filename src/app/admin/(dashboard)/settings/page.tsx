"use client";

import React from 'react';
import { Form, Input, Button, Card, Tabs, Space, message, Divider, Breadcrumb } from 'antd';
import { SettingOutlined, PhoneOutlined, MailOutlined, HomeOutlined, FacebookOutlined, YoutubeOutlined, UserOutlined } from '@ant-design/icons';

export default function AdminSettingsPage() {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.loading({ content: 'Đang lưu cài đặt...', key: 'save' });
    setTimeout(() => {
      message.success({ content: 'Lưu thay đổi thành công!', key: 'save' });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb items={[{ title: 'Admin' }, { title: 'Thông tin chung' }]} />
        <h1 className="text-2xl font-black text-sanfovet-dark mt-2">Cài đặt Website & Thông tin liên hệ</h1>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
        <Tabs
          className="admin-settings-tabs"
          items={[
            {
              key: 'general',
              label: <span className="flex items-center gap-2"><HomeOutlined /> Thông tin cơ sở</span>,
              children: (
                <div className="p-8 max-w-2xl">
                   <h3 className="text-xl font-black mb-6 border-b pb-2 uppercase tracking-tight italic">Trụ sở & Chi nhánh</h3>
                   <Form form={form} layout="vertical" initialValues={{ name: 'Sanfovet' }}>
                      <Form.Item label="Tên công ty" initialValue="Công ty CP Đầu tư Liên doanh Việt Anh (SANFOVET)">
                         <Input size="large" />
                      </Form.Item>
                      <Form.Item label="Trụ sở chính (Hà Nội)" initialValue="Cụm công nghiệp Liên Phương, Thường Tín, TP. Hà Nội">
                         <Input size="large" />
                      </Form.Item>
                      <Form.Item label="Chi nhánh (Miền Nam)" initialValue="Khu vực Hố Nai, Trảng Bom, Tỉnh Đồng Nai">
                         <Input size="large" />
                      </Form.Item>
                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Hotline 1" initialValue="024 66861629">
                           <Input size="large" prefix={<PhoneOutlined />} />
                        </Form.Item>
                        <Form.Item label="Hotline 2" initialValue="0974 999 204">
                           <Input size="large" prefix={<PhoneOutlined />} />
                        </Form.Item>
                      </div>
                      <Form.Item label="Email chính" initialValue="pkd.sanfovet@gmail.com">
                         <Input size="large" prefix={<MailOutlined />} />
                      </Form.Item>
                      <Button type="primary" size="large" onClick={handleSave} className="rounded-lg px-10 font-bold mt-4">Cập nhật ngay</Button>
                   </Form>
                </div>
              )
            },
            {
              key: 'social',
              label: <span className="flex items-center gap-2"><FacebookOutlined /> Mạng xã hội</span>,
              children: (
                 <div className="p-8 max-w-2xl">
                    <h3 className="text-xl font-black mb-6 border-b pb-2 uppercase tracking-tight italic">Liên kết Cộng đồng</h3>
                    <Form layout="vertical">
                       <Form.Item label="Facebook Page URL">
                          <Input size="large" prefix={<FacebookOutlined className="text-blue-600" />} placeholder="Dán link fanpage..." />
                       </Form.Item>
                       <Form.Item label="Zalo Phone / Link">
                          <Input size="large" placeholder="0974 999 204" />
                       </Form.Item>
                       <Form.Item label="YouTube Channel">
                          <Input size="large" prefix={<YoutubeOutlined className="text-red-500" />} />
                       </Form.Item>
                       <Button type="primary" size="large" onClick={handleSave} className="rounded-lg px-10 font-bold mt-4">Lưu liên kết</Button>
                    </Form>
                 </div>
              )
            },
            {
              key: 'support',
              label: <span className="flex items-center gap-2"><UserOutlined /> Hỗ trợ kỹ thuật</span>,
              children: (
                 <div className="p-8 max-w-2xl">
                    <h3 className="text-xl font-black mb-6 border-b pb-2 uppercase tracking-tight italic">Thông tin Bác sĩ thú y</h3>
                    <Form layout="vertical">
                       <Form.Item label="Họ tên BSTY" initialValue="Hoàng Đăng Trạng">
                          <Input size="large" />
                       </Form.Item>
                       <Form.Item label="Số điện thoại hỗ trợ" initialValue="0383 814 838">
                          <Input size="large" prefix={<PhoneOutlined />} />
                       </Form.Item>
                       <Form.Item label="Email hỗ trợ" initialValue="dangtrang19877@gmail.com">
                          <Input size="large" prefix={<MailOutlined />} />
                       </Form.Item>
                       <Button type="primary" size="large" onClick={handleSave} className="rounded-lg px-10 font-bold mt-4">Cập nhật hồ sơ BSTY</Button>
                    </Form>
                 </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}
