"use client";

import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card, App } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const { message: msg } = App.useApp();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const onFinish = (values: any) => {
    const user = values.username;
    const password = values.password;
    if (user === process.env.NEXT_PUBLIC_ADMIN_USERNAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      msg.success('Đăng nhập thành công!');
      localStorage.setItem('admin_token', 'true');
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } else {
      msg.error('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f2] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-xl mb-6">
             <h1 className="text-4xl font-black text-primary tracking-tighter italic">BIOTECH-VET</h1>
          </div>
          <h2 className="text-2xl font-black text-biotechvet-dark uppercase tracking-tight">Hệ thống Quản trị</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[4px] mt-2">Đăng nhập để tiếp tục</p>
        </div>

        <Card className="rounded-[32px] shadow-2xl border-none p-4 md:p-8">
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-300" />} 
                placeholder="Tên đăng nhập" 
                className="rounded-xl h-14"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-300" />}
                placeholder="Mật khẩu"
                className="rounded-xl h-14"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-xs font-bold text-gray-500">Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a className="text-xs font-bold text-primary hover:text-primary-dark" href="">
                Quên mật khẩu?
              </a>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-primary/30"
                icon={<ArrowRightOutlined />}
              >
                ĐĂNG NHẬP NGAY
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-xs font-medium italic">
            &copy; 2026 Bản quyền thuộc về BIOTECH-VET.
          </p>
        </div>
      </div>
    </div>
  );
}
