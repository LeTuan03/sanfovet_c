"use client";

import React from 'react';
import { Button, ConfigProvider, Input, Select } from 'antd';
import { FilterOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface AdminFilterSelect {
  key: string;
  placeholder: string;
  options: { label: React.ReactNode; value: string }[];
  width?: number;
}

interface AdminFilterBarProps {
  filters?: AdminFilterSelect[];
  searchPlaceholder?: string;
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  extra?: React.ReactNode;
}

export default function AdminFilterBar({
  filters = [],
  searchPlaceholder = "Tìm kiếm nhanh...",
  primaryAction,
  extra
}: Readonly<AdminFilterBarProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [values, setValues] = React.useState<Record<string, string | undefined>>({});
  const [search, setSearch] = React.useState('');

  // Đồng bộ lại state khi URL thay đổi (back/forward, đặt lại...)
  React.useEffect(() => {
    const next: Record<string, string | undefined> = {};
    filters.forEach(f => { next[f.key] = searchParams.get(f.key) || undefined; });
    setValues(next);
    setSearch(searchParams.get('q') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const pushUrl = (vals: Record<string, string | undefined>, q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    filters.forEach(f => {
      const v = vals[f.key];
      if (v) params.set(f.key, v);
      else params.delete(f.key);
    });
    if (q.trim()) params.set('q', q.trim());
    else params.delete('q');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  // Chỉ cập nhật state cục bộ — bấm "Tìm kiếm" (hoặc Enter) mới áp dụng bộ lọc
  const handleSelectChange = (key: string, v: string | undefined) => {
    setValues(prev => ({ ...prev, [key]: v }));
  };

  const handleReset = () => {
    setValues({});
    setSearch('');
    pushUrl({}, '');
  };

  return (
    // Đồng bộ chiều cao & bo góc cho mọi control trong thanh lọc
    <ConfigProvider theme={{ token: { controlHeight: 38, borderRadius: 10 } }}>
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-gray-400 font-black uppercase text-[11px] tracking-widest mr-1 shrink-0">
          <FilterOutlined /> Bộ lọc
        </div>

        {filters.map(f => (
          <Select
            key={f.key}
            allowClear
            placeholder={f.placeholder}
            value={values[f.key]}
            onChange={(v) => handleSelectChange(f.key, v)}
            options={f.options}
            style={{ width: f.width ?? 180 }}
          />
        ))}

        <Input
          prefix={<SearchOutlined className="text-gray-300" />}
          placeholder={searchPlaceholder}
          value={search}
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={() => pushUrl(values, search)}
          style={{ width: 260 }}
        />

        <Button
          icon={<SearchOutlined />}
          onClick={() => pushUrl(values, search)}
        >
          Tìm kiếm
        </Button>

        <Button
          icon={<ReloadOutlined />}
          onClick={handleReset}
        >
          Đặt lại
        </Button>

        {(extra || primaryAction) && (
          <div className="ml-auto flex items-center gap-3">
            {extra}
            {primaryAction && (
              <Button
                type="primary"
                icon={primaryAction.icon || <PlusOutlined />}
                onClick={primaryAction.onClick}
                className="font-bold px-6 uppercase tracking-wider text-[11px] shadow-lg shadow-primary/20 border-none"
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}
