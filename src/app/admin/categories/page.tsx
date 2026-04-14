"use client";

import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function GenericPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Result
        icon={<SmileOutlined style={{ color: '#1a8c3f' }} />}
        title="Tính năng đang được phát triển"
        subTitle="Mô-đun quản lý này sẽ sớm được hoàn thiện để phục vụ công tác điều hành."
        extra={
          <Link href="/admin">
            <Button type="primary" className="rounded-full font-bold h-10 px-8 uppercase tracking-wider text-xs">Quay lại Tổng quan</Button>
          </Link>
        }
      />
    </div>
  );
}
