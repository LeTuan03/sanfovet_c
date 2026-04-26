"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Modal, Form, Input, Select, Tag, Breadcrumb, Row, Col, Tooltip, App, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, GlobalOutlined } from '@ant-design/icons';
// import { jobs as initialJobs } from '@/lib/data'; // Removed static import
import CKEditor from '@/components/admin/CKEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { adminFetch } from '@/lib/api';

function AdminJobsPageContent() {
  const { modal, message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load data from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await adminFetch('/api/data/jobs');
        const jobsData = await res.json();
        setData(jobsData);
      } catch (error) {
        message.error('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [message]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

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

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        ...record,
        date: record.date ? dayjs(record.date, 'YYYY-MM-DD') : dayjs(),
      });
    } else {
      setEditingId(null);
      form.resetFields();
      form.setFieldsValue({
        date: dayjs(),
      });
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const formattedValues = {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      };

      let newData = [];
      if (editingId) {
        newData = data.map((item) => (item.id === editingId ? { ...item, ...formattedValues } : item));
      } else {
        const newJob = {
          ...formattedValues,
          id: Math.max(...data.map((j) => j.id), 0) + 1,
          slug: values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
        };
        newData = [newJob, ...data];
      }

      // Save to API
      try {
        const res = await adminFetch('/api/data/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (res.ok) {
          setData(newData);
          message.success(editingId ? 'Cập nhật tin tuyển dụng thành công' : 'Đăng tin tuyển dụng thành công');
          setIsModalOpen(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        message.error('Lỗi khi lưu dữ liệu');
      }
    });
  };

  const handleRemove = async (id: number) => {
    const newData = data.filter(j => j.id !== id);
    try {
      const res = await adminFetch('/api/data/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
        message.success('Đã gỡ tin tuyển dụng');
      } else {
        throw new Error();
      }
    } catch (error) {
      message.error('Lỗi khi gỡ tin');
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
      render: () => <Tag color="green" className="font-bold uppercase text-[10px]">Đang tuyển</Tag>
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
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
      <div className="flex justify-between items-center mb-10">
        <div>
          <Breadcrumb items={[{ title: 'Admin', href: '/admin' }, { title: 'Quản lý Tuyển dụng' }]} />
          <h1 className="text-2xl font-black text-biotechvet-dark mt-2 tracking-tight uppercase italic">Quản lý Tuyển dụng</h1>

        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
          onClick={() => showModal()}
        >
          Đăng tin mới
        </Button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-6 flex gap-4">
          <Input 
            prefix={<SearchOutlined className="text-gray-300" />} 
            placeholder="Tìm kiếm vị trí..." 
            className="max-w-md rounded-xl"
            defaultValue={query}
            onChange={handleSearch}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id" 
          loading={loading}
          pagination={{ 
            current: page,
            pageSize: 6,
            onChange: (p) => updateUrl({ page: p })
          }}
          className="border border-gray-50 rounded-2xl overflow-hidden" 
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
