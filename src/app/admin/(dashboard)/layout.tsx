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
  PictureOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider, Avatar, Dropdown, Space, Badge, MenuProps } from 'antd';
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
      key: '/admin/news',
      icon: <ReadOutlined />,
      label: 'Quản lý Tin tức',
    },
    {
      key: '/admin/jobs',
      icon: <UsergroupAddOutlined />,
      label: 'Tuyển dụng',
    },
    {
      type: 'divider',
      key: 'div1',
    },
    {
      key: '/admin/banners',
      icon: <PictureOutlined />,
      label: 'Banner / Slider',
    },
    {
      key: '/admin/media-gallery',
      icon: <VideoCameraOutlined />,
      label: 'Video & Hình ảnh',
    },
    {
      key: '/admin/menus',
      icon: <MenuOutlined />,
      label: 'Quản lý Menu',
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Thông tin chung',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Người dùng admin',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Hồ sơ cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Cài đặt tài khoản',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
      key: 'div2',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
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
            items={menuItems as any}
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
            <div className="flex items-center gap-6">
              <Badge count={3} size="small">
                <Button type="text" icon={<BellOutlined />} className="text-gray-500" />
              </Badge>
              <Dropdown menu={{ items: userMenuItems as any }} placement="bottomRight" arrow>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                  <Avatar style={{ backgroundColor: '#1a8c3f' }} icon={<UserOutlined />} />
                  <div className="hidden md:block">
                    <div className="text-xs font-black text-sanfovet-dark leading-none">Admin Sanfovet</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Quản trị viên</div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: '#f8faf9',
              flex: 'auto',
            }}
          >
            <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
