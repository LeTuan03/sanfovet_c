"use client";

import React from 'react';
import { Breadcrumb, Input, Button, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  extra?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  breadcrumbItems,
  searchPlaceholder = "Tìm kiếm nhanh...",
  onSearch,
  primaryAction,
  extra
}: AdminPageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col mb-8 gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <Breadcrumb 
            items={breadcrumbItems.map(item => ({
              title: item.href ? <a onClick={() => router.push(item.href!)} className="cursor-pointer">{item.title}</a> : item.title
            }))}
            className="text-[11px] font-medium uppercase tracking-wider opacity-60 mb-1"
          />
          <h1 className="text-3xl font-black text-biotechvet-dark uppercase tracking-tighter leading-tight">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {extra}
          {onSearch && (
            <Input 
              prefix={<SearchOutlined className="text-gray-300" />} 
              placeholder={searchPlaceholder} 
              className="w-64 rounded-xl border-gray-100 shadow-sm focus:shadow-md transition-all h-10 px-4"
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
          {primaryAction && (
            <Button 
              type="primary" 
              icon={primaryAction.icon || <PlusOutlined />} 
              onClick={primaryAction.onClick}
              className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-[11px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 via-gray-50 to-transparent"></div>
    </div>
  );
}
