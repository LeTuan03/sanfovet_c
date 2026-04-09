"use client";

import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function JobsPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Result
        icon={<SmileOutlined style={{ color: '#1a8c3f' }} />}
        title="Quản lý Tuyển dụng"
        subTitle="Tính năng này đang được đồng bộ hóa dữ liệu từ phòng nhân sự."
        extra={
          <Link href="/admin">
            <Button type="primary" className="rounded-full font-bold h-10 px-8 uppercase tracking-wider text-xs">Quay lại Tổng quan</Button>
          </Link>
        }
      />
    </div>
  );
}
