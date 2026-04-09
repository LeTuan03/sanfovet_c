"use client";

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: 'Quản lý Sản phẩm',
    },
    {
      key: '/admin/categories',
      icon: <AppstoreOutlined />,
      label: 'Quản lý Danh mục',
    },
    {
      key: '/admin/articles',
      icon: <ReadOutlined />,
      label: 'Bài viết & Cẩm nang',
    },
    {
      key: '/admin/jobs',
      icon: <UsergroupAddOutlined />,
      label: 'Tuyển dụng',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a8c3f',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="shadow-lg border-r border-gray-100">
          <div className="p-6 text-center border-b border-gray-50 mb-4">
             <h2 className={`font-black tracking-tighter text-primary italic transition-all duration-300 ${collapsed ? 'text-lg' : 'text-2xl'}`}>
                {collapsed ? 'SF' : 'SANFOVET'}
             </h2>
             {!collapsed && <div className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mt-1">Hệ thống Quản trị</div>}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none"
          />
        </Sider>
        <Layout>
          <Header style={{ padding: '0 24px', background: colorBgContainer }} className="flex justify-between items-center shadow-sm border-b border-gray-100">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '18px',
                width: 48,
                height: 48,
              }}
            />
            <div className="flex items-center gap-4">
               <span className="font-bold text-gray-500">Administrator</span>
               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">A</div>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 24px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="shadow-sm"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
