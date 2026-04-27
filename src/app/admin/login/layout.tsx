"use client";

import React from 'react';
import { ConfigProvider, App } from 'antd';
import viVN from 'antd/locale/vi_VN';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#199ad6',
          borderRadius: 16,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
