"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Modal, Form, Input, Select, Tag, Breadcrumb, Row, Col, Tooltip, App, DatePicker } from 'antd';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminFilterBar from '@/components/admin/AdminFilterBar';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, GlobalOutlined } from '@ant-design/icons';
// import { jobs as initialJobs } from '@/lib/data'; // Removed static import
import CKEditor from '@/components/admin/CKEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { adminFetch } from '@/lib/api';
import { Job, JobSummary } from '@/types';
import { useAdminLoading } from '@/lib/AdminLoadingContext';

function AdminJobsPageContent() {
  const { modal, message } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const filterLocation = searchParams.get('location') || '';
  const filterStatus = searchParams.get('status') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<bigint | null>(null);

  // Load data from API
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/data/jobs?summary=1');
      const jobsData = await res.json();
      setData(jobsData);
    } catch (error) {
      message.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [message]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = !filterLocation || item.location === filterLocation;
      const matchesStatus =
        !filterStatus || (filterStatus === 'closed' ? item.status === 'closed' : item.status !== 'closed');
      return matchesQuery && matchesLocation && matchesStatus;
    });
  }, [data, query, filterLocation, filterStatus]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(data.map(item => item.location).filter(Boolean)))
      .map(loc => ({ label: loc, value: loc }));
  }, [data]);

  const updateUrl = (params: { q?: string; page?: number }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (params.q !== undefined) {
      if (params.q) newSearchParams.set('q', params.q);
      else newSearchParams.delete('q');
      newSearchParams.set('page', '1'); // Reset to page 1 on search
    }

    if (params.page !== undefined) {
      newSearchParams.set('page', params.page.toString());
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrl({ q: e.target.value });
  };

  const showModal = async (record?: JobSummary) => {
    if (record) {
      setEditingId(record.id);
      setIsModalOpen(true);
      form.resetFields();
      try {
        const res = await adminFetch(`/api/data/jobs?id=${record.id}`);
        if (!res.ok) throw new Error('Không thể tải chi tiết tin tuyển dụng');
        const full: Job = await res.json();
        form.setFieldsValue({
          ...full,
          date: full.date ? dayjs(full.date, 'YYYY-MM-DD') : dayjs(),
        });
      } catch (error: any) {
        message.error(error.message || 'Không thể tải chi tiết tin tuyển dụng');
      }
    } else {
      setEditingId(null);
      form.resetFields();
      form.setFieldsValue({
        date: dayjs(),
      });
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const formattedValues = {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      };

      const action = editingId ? 'update' : 'create';

      // Save to API
      setGlobalLoading(true);
      try {
        const res = await adminFetch('/api/data/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            data: {
              ...formattedValues,
              slug: values.slug || values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
            },
            id: editingId?.toString()
          }),
        });

        if (res.ok) {
          await fetchData();
          message.success(editingId ? 'Cập nhật tin tuyển dụng thành công' : 'Đăng tin tuyển dụng thành công');
          setIsModalOpen(false);
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Lỗi khi lưu dữ liệu');
        }
      } catch (error: any) {
        message.error(error.message || 'Lỗi khi lưu dữ liệu');
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const handleRemove = async (id: bigint) => {
    setGlobalLoading(true);
    try {
      const res = await adminFetch('/api/data/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          id: id.toString()
        }),
      });
      if (res.ok) {
        await fetchData();
        message.success('Đã gỡ tin tuyển dụng');
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Lỗi khi gỡ tin');
      }
    } catch (error: any) {
      message.error(error.message || 'Lỗi khi gỡ tin');
    } finally {
      setGlobalLoading(false);
    }
  };

  const columns = [
    {
      title: 'Vị trí Tuyển dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-bold text-gray-800">{text}</span>,
    },
    {
      title: 'Khu vực',
      dataIndex: 'location',
      key: 'location',
      render: (text: string) => (
        <Space>
          <GlobalOutlined className="text-gray-400" />
          <span className="text-xs font-medium text-gray-500">{text}</span>
        </Space>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'date',
      key: 'date',
      render: (d: string) => <span className="text-gray-400 text-xs">{d}</span>
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: JobSummary) => (
        record.status === 'closed'
          ? <Tag color="default" className="font-bold uppercase text-[10px]">Đã đóng</Tag>
          : <Tag color="green" className="font-bold uppercase text-[10px]">Đang tuyển</Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: JobSummary) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined />} type="text" className="text-blue-500" onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Gỡ tin">
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              onClick={() => {
                modal.confirm({
                  title: 'Xác nhận gỡ tin tuyển dụng?',
                  content: `Bạn có chắc chắn muốn gỡ vị trí "${record.title}" không?`,
                  okText: 'Gỡ tin ngay',
                  cancelText: 'Hủy',
                  okType: 'danger',
                  onOk: () => handleRemove(record.id)
                });
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Tuyển dụng"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Quản lý Tuyển dụng' },
        ]}
      />

      <AdminFilterBar
        searchPlaceholder="Tìm theo vị trí, khu vực..."
        primaryAction={{
          label: 'Đăng tin mới',
          onClick: () => showModal(),
          icon: <PlusOutlined />
        }}
        filters={[
          {
            key: 'location',
            placeholder: 'Khu vực',
            width: 180,
            options: locationOptions,
          },
          {
            key: 'status',
            placeholder: 'Trạng thái',
            width: 160,
            options: [
              { label: 'Đang tuyển', value: 'active' },
              { label: 'Đã đóng', value: 'closed' },
            ],
          },
        ]}
      />

      <div className="bg-white overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100" style={{ borderRadius: "3px 3px 32px 32px" }}>
        <Table size="small" sticky
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize: 6,
            className: "p-6 border-t border-gray-50",
            onChange: (p) => updateUrl({ page: p })
          }}
          className="admin-table"
        />
      </div>

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingId ? 'Chỉnh sửa' : 'Đăng'} tin tuyển dụng</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={900}
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        centered
        okText="Lưu & Xuất bản"
        cancelText="Hủy"
        className="rounded-[32px] top-[40px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item name="title" label="Tiêu đề vị trí" rules={[{ required: true }]}>
                <Input className="rounded-xl py-3 px-4 font-bold text-lg" placeholder="VD: Nhân viên Kinh doanh khu vực..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="location" label="Khu vực làm việc" rules={[{ required: true }]}>
                <Input className="rounded-xl py-3 px-4" placeholder="VD: Ninh Bình, Hà Nội..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Nội dung chi tiết (Mô tả, yêu cầu, quyền lợi)">
            <CKEditor placeholder="Nhập chi tiết thông tin tuyển dụng..." />
          </Form.Item>

          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="status" label="Trạng thái hiển thị" initialValue="active">
                <Select className="rounded-xl">
                  <Select.Option value="active">Đang mở tuyển</Select.Option>
                  <Select.Option value="closed">Đã đóng / Tạm dừng</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item name="date" label="Ngày đăng tin">
                <DatePicker className="w-full rounded-xl py-2" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="thumbnail" label="Hình ảnh Poster (Tùy chọn)">
            <ImageUpload label="Tải ảnh poster" aspectRatio="16/9" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}


export default function AdminJobsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <AdminJobsPageContent />
    </React.Suspense>
  );
}
