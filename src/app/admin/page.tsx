"use client";

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical p-4">
            <h2 className={`text-white font-bold transition-all duration-300 ${collapsed ? 'text-xs text-center' : 'text-xl'}`}>
                {collapsed ? 'SF' : 'SANFOVET'}
            </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Quản lý Sản phẩm',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Quản lý Danh mục',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Cẩm nang chăn nuôi',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="prose">
              <h1 className="text-2xl font-bold mb-4">Chào mừng đến với trang Quản trị</h1>
              <p>Đây là phiên bản Admin Sanfovet sử dụng <strong>Ant Design</strong> kết hợp Next.js.</p>
              <p>Các tài nguyên cũ như admin.js, style.css, v.v. đã được lưu trú an toàn trong thư mục _old_vite để bạn xem lùi khi cần tham khảo logic cũ.</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

