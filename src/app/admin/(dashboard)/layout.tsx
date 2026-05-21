"use client";

import React, { useState, useEffect } from 'react';
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
  InfoCircleOutlined,
  FileTextOutlined,
  BookOutlined,
  FolderOpenOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider, Avatar, Dropdown, Badge, App } from 'antd';
import viVN from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { AdminLoadingProvider } from '@/lib/AdminLoadingContext';

dayjs.locale('vi');

const { Header, Sider, Content } = Layout;

// ─── Sidebar section divider label ───────────────────────────────────────────
function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) {
    return (
      <div className="mx-auto my-2 w-6 border-t border-gray-100" />
    );
  }
  return (
    <div className="flex items-center gap-2 px-4 pt-5 pb-1">
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: '#b0bec5',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div className="flex-1 border-t border-gray-100 mt-px" />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token || token !== process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET) {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    } else {
      setIsAuthChecking(false);
    }
  }, [router]);

  // ─── Menu sections ──────────────────────────────────────────────────────────
  const dashboardItems: any[] = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
  ];

  const contentItems: any[] = [
    { key: '/admin/products',   icon: <ShoppingOutlined />,   label: 'Sản phẩm' },
    { key: '/admin/categories', icon: <AppstoreOutlined />,   label: 'Danh mục' },
    { key: '/admin/articles',   icon: <FileTextOutlined />,   label: 'Bệnh học' },
    { key: '/admin/handbooks',  icon: <BookOutlined />,       label: 'Cẩm nang chăn nuôi' },
    { key: '/admin/catalogue',  icon: <FolderOpenOutlined />, label: 'Catalogue & Tài liệu' },
    { key: '/admin/news',       icon: <NotificationOutlined />, label: 'Tin tức' },
    { key: '/admin/jobs',       icon: <UsergroupAddOutlined />, label: 'Tuyển dụng' },
  ];

  const systemItems: any[] = [
    { key: '/admin/banners',       icon: <PictureOutlined />,    label: 'Banner / Slider' },
    { key: '/admin/media-gallery', icon: <VideoCameraOutlined />, label: 'Video & Hình ảnh' },
    { key: '/admin/menus',         icon: <MenuOutlined />,        label: 'Quản lý Menu' },
    { key: '/admin/settings',      icon: <SettingOutlined />,     label: 'Thông tin chung' },
    { key: '/admin/about',         icon: <InfoCircleOutlined />,  label: 'Trang Giới thiệu' },
  ];

  const userMenuItems = [
    // { key: 'profile',  label: 'Hồ sơ cá nhân',     icon: <UserOutlined /> },
    // { key: 'settings', label: 'Cài đặt tài khoản',  icon: <SettingOutlined /> },
    // { type: 'divider', key: 'div2' },
    { key: 'logout',   label: 'Đăng xuất',          icon: <LogoutOutlined />, danger: true },
  ];

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    } else {
      router.push(e.key);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
        <div className="text-primary font-bold">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#199ad6',
          borderRadius: 10,
          fontFamily: "'Inter', sans-serif",
          colorBgBase: '#ffffff',
        },
        components: {
          Menu: {
            itemSelectedBg: 'rgba(25, 154, 214, 0.08)',
            itemSelectedColor: '#199ad6',
            itemHoverBg: 'rgba(0,0,0,0.03)',
            itemColor: '#64748b',
            itemHeight: 42,
            itemMarginInline: 8,
            itemBorderRadius: 8,
            itemPaddingInline: 12,
            iconSize: 16,
          },
          Layout: {
            headerBg: '#ffffff',
            headerHeight: 64,
          },
          Button: {
            borderRadius: 10,
            controlHeight: 40,
            fontWeight: 600,
          },
        },
      }}
    >
      <AdminLoadingProvider>
        <App>
          <Layout hasSider className="h-screen">
            {/* ─── SIDEBAR ─────────────────────────────────────────────────────── */}
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
              width={248}
              collapsedWidth={68}
              style={{
                overflow: 'hidden',
                height: '100vh',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#ffffff',
                borderRight: '1px solid #f1f5f9',
                boxShadow: '2px 0 12px rgba(0,0,0,0.03)',
                transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Logo */}
              <div
                style={{
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  padding: collapsed ? '0' : '0 20px',
                  borderBottom: '1px solid #f1f5f9',
                  gap: 10,
                  transition: 'all 0.2s',
                  overflow: 'hidden',
                }}
              >
                {/* Icon mark */}
                <div
                  style={{
                    minWidth: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'linear-gradient(135deg, #199ad6 0%, #0f7ab5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(25,154,214,0.30)',
                  }}
                >
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: '-0.5px' }}>B</span>
                </div>

                {/* Brand name — hide when collapsed */}
                {!collapsed && (
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        letterSpacing: '-0.3px',
                        color: '#0f172a',
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      BIOTECH-VET
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#94a3b8',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Admin Panel
                    </div>
                  </div>
                )}
              </div>

              {/* Menu content — scrollable middle section */}
              <div style={{ padding: '8px 0 16px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

                <SectionLabel label="Dashboard" collapsed={collapsed} />
                <Menu
                  mode="inline"
                  selectedKeys={[pathname]}
                  items={dashboardItems}
                  onClick={handleMenuClick}
                  inlineIndent={12}
                  style={{ border: 'none', background: 'transparent' }}
                />

                <SectionLabel label="Nội dung" collapsed={collapsed} />
                <Menu
                  mode="inline"
                  selectedKeys={[pathname]}
                  items={contentItems}
                  onClick={handleMenuClick}
                  inlineIndent={12}
                  style={{ border: 'none', background: 'transparent' }}
                />

                <SectionLabel label="Hệ thống" collapsed={collapsed} />
                <Menu
                  mode="inline"
                  selectedKeys={[pathname]}
                  items={systemItems}
                  onClick={handleMenuClick}
                  inlineIndent={12}
                  style={{ border: 'none', background: 'transparent' }}
                />
              </div>

              {/* spacer */}
              <div style={{ height: 8 }} />
            </Sider>

            {/* ─── MAIN AREA ────────────────────────────────────────────────────── */}
            <Layout style={{ background: '#f8fafb' }}>
              {/* Header */}
              <Header
                style={{
                  padding: '0 24px',
                  background: '#ffffff',
                  borderBottom: '1px solid #f1f5f9',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                }}
              >
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9,
                    color: '#64748b',
                    fontSize: 16,
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {/* User menu */}
                  <Dropdown
                    menu={{ items: userMenuItems as any, onClick: handleMenuClick }}
                    placement="bottomRight"
                    arrow={false}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        padding: '5px 10px 5px 5px',
                        borderRadius: 10,
                        transition: 'background 0.15s',
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Avatar
                        size={32}
                        style={{
                          backgroundColor: '#199ad6',
                          boxShadow: '0 2px 8px rgba(25,154,214,0.3)',
                        }}
                        icon={<UserOutlined />}
                      />
                      <div className="hidden lg:block" style={{ lineHeight: 'normal' }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                          Admin
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                          Quản trị viên
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </Header>

              {/* Page content */}
              <Content
                style={{
                  padding: 24,
                  minHeight: 280,
                  background: '#f8fafb',
                  flex: 'auto',
                }}
              >
                <div style={{ maxWidth: 1600, margin: '0 auto' }}>
                  {children}
                </div>
              </Content>
            </Layout>
          </Layout>
        </App>
      </AdminLoadingProvider>
    </ConfigProvider>
  );
}