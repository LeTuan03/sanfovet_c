"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Tag, Breadcrumb, Row, Col, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UsergroupAddOutlined, GlobalOutlined } from '@ant-design/icons';
import { jobs as initialJobs } from '@/lib/data';
import CKEditor from '@/components/admin/CKEditor';

export default function AdminJobsPage() {
  const [data, setData] = useState([...initialJobs]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        setData(data.map((item) => (item.id === editingId ? { ...item, ...values } : item)));
        message.success('Cập nhật tin tuyển dụng thành công');
      } else {
        const newJob = {
          ...values,
          id: Math.max(...data.map((j) => j.id), 0) + 1,
          slug: values.title.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
          date: new Date().toISOString().split('T')[0],
        };
        setData([newJob, ...data]);
        message.success('Đăng tin tuyển dụng thành công');
      }
      setIsModalOpen(false);
    });
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
            <Button icon={<DeleteOutlined />} type="text" danger onClick={() => setData(data.filter(j => j.id !== record.id))} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Tuyển dụng' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight uppercase italic">Quản lý Tuyển dụng</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Cập nhật nhân sự và cơ hội nghề nghiệp tại Sanfovet</p>
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
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id" 
          pagination={{ pageSize: 6 }}
          className="border border-gray-50 rounded-2xl overflow-hidden" 
        />
      </div>

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingId ? 'Chỉnh sửa' : 'Đăng'} tin tuyển dụng</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={900}
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
            <Col span={12}>
               <Form.Item name="status" label="Trạng thái hiển thị" initialValue="active">
                  <Select className="rounded-xl">
                    <Select.Option value="active">Đang mở tuyển</Select.Option>
                    <Select.Option value="closed">Đã đóng / Tạm dừng</Select.Option>
                  </Select>
               </Form.Item>
            </Col>
            <Col span={12}>
               <Form.Item name="thumbnail" label="URL Ảnh Poster (Tùy chọn)">
                 <Input className="rounded-xl" placeholder="/images/jobs-poster.png" />
               </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
