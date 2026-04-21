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
import { Button, Layout, Menu, theme, ConfigProvider, Avatar, Dropdown, Space, Badge, MenuProps, App } from 'antd';
import viVN from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';

dayjs.locale('vi');

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

  const menuItems: any[] = [
    {
      label: 'DASHBOARD',
      type: 'group',
      children: [
        {
          key: '/admin',
          icon: <DashboardOutlined />,
          label: 'Tổng quan',
        },
      ]
    },
    {
      label: 'QUẢN LÝ NỘI DUNG',
      type: 'group',
      children: [
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
          label: 'Quản lý Bệnh học',
        },
        {
          key: '/admin/handbooks',
          icon: <ReadOutlined />,
          label: 'Cẩm nang chăn nuôi',
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
      ]
    },
    {
      label: 'CẤU HÌNH HỆ THỐNG',
      type: 'group',
      children: [
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
      ]
    }
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
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#1a8c3f',
          borderRadius: 16,
          fontFamily: "'Inter', sans-serif",
          colorBgBase: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        },
        components: {
          Menu: {
            itemSelectedBg: '#f0f9f2',
            itemSelectedColor: '#1a8c3f',
            itemHoverBg: '#f8faf9',
            groupTitleFontSize: 11,
            groupTitleColor: '#a0aec0',
            itemColor: '#4a5568',
            itemHeight: 48,
            itemMarginInline: 12,
            itemBorderRadius: 12,
          },
          Layout: {
            headerBg: 'rgba(255, 255, 255, 0.8)',
            headerHeight: 72,
          },
          Button: {
            borderRadius: 12,
            controlHeight: 40,
            fontWeight: 600,
          },
          Card: {
            borderRadiusLG: 24,
          }
        }
      }}
    >
      <App>
        <Layout className="min-h-screen bg-white">
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed} 
            theme="light" 
            width={260}
            className="shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-gray-50 sticky top-0 h-screen"
          >
            <div className="px-6 py-8 mb-2 flex flex-col items-center">
               <div className="flex items-center gap-3 justify-center mb-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30 transform hover:scale-105 transition-transform duration-300">S</div>
                  {!collapsed && (
                    <h2 className="font-black tracking-tighter text-sanfovet-dark text-2xl mb-0 transition-opacity duration-300 bg-clip-text text-transparent bg-gradient-to-r from-sanfovet-dark to-primary">
                      BIOTECH-VET
                    </h2>
                  )}
               </div>
               {!collapsed && (
                 <div className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.25em] text-center opacity-70">
                   Management Suite
                 </div>
               )}
            </div>
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              className="admin-sidebar-menu border-none px-2"
            />
          </Sider>
          <Layout>
            <Header 
              style={{ 
                padding: '0 32px', 
                backdropFilter: 'blur(8px)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }} 
              className="shadow-[0_1px_2px_rgba(0,0,0,0.03)] border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className="hover:bg-gray-50 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    fontSize: '18px',
                    width: 44,
                    height: 44,
                  }}
                />
              </div>
              <div className="flex items-center gap-6">
                <Badge count={3} size="small" offset={[-2, 6]}>
                  <Button 
                    type="text" 
                    icon={<BellOutlined />} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center justify-center w-11 h-11 rounded-2xl hover:bg-gray-50" 
                  />
                </Badge>
                <Dropdown menu={{ items: userMenuItems as any }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-2xl transition-all border border-transparent hover:border-gray-100 bg-gray-50/50">
                    <Avatar 
                      size={36}
                      style={{ backgroundColor: '#1a8c3f' }} 
                      icon={<UserOutlined />} 
                      className="shadow-lg shadow-primary/20 ring-2 ring-white"
                    />
                    <div className="hidden lg:block">
                      <div className="text-[12px] font-black text-sanfovet-dark leading-none uppercase tracking-tight">Admin Sanfovet</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-1.5 opacity-80">Quản trị viên</div>
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
      </App>
    </ConfigProvider>
  );
}
