"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Upload, message, Breadcrumb, Switch, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const initialBanners = [
  { id: 1, image: '/images/banner1.png', title: 'Banner Trang chủ 1', link: '/san-pham', order: 1, status: true },
  { id: 2, image: '/images/banner2.png', title: 'Banner Khuyến mãi tháng 4', link: '/tin-tuc', order: 2, status: true },
  { id: 3, image: '/images/banner1.png', title: 'Banner Tuyển dụng miền Trung', link: '/tuyen-dung', order: 3, status: false },
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      align: 'center' as const,
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-1 w-fit">
          <img src={text} alt="banner" style={{ width: 120, height: 60, objectFit: 'cover', borderRadius: 4 }} />
        </div>
      ),
    },
    {
      title: 'Tên Banner',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Đường dẫn (Link)',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => <code className="bg-gray-50 px-2 py-1 rounded text-primary text-xs">{link}</code>
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status: boolean) => <Switch checked={status} checkedChildren="Hiện" unCheckedChildren="Ẩn" />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Di chuyển lên">
            <Button icon={<ArrowUpOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Di chuyển xuống">
            <Button icon={<ArrowDownOutlined />} size="small" />
          </Tooltip>
          <Button 
            type="primary" 
            ghost 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xóa banner',
      content: 'Bạn có chắc muốn xóa banner này?',
      okText: 'Xóa ngay',
      okType: 'danger',
      onOk: () => {
        setBanners(banners.filter(b => b.id !== id));
        message.success('Đã xóa thành công');
      }
    });
  };

  const handleAdd = () => {
    setEditingBanner(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingBanner) {
        setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, ...values } : b));
        message.success('Đã cập nhật banner');
      } else {
        const newBanner = {
          id: banners.length + 1,
          image: '/images/banner1.png',
          ...values,
          order: banners.length + 1,
        };
        setBanners([...banners, newBanner]);
        message.success('Đã thêm banner mới');
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Banner Slider' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 uppercase">Quản lý Banner / Slider</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          className="rounded-lg font-bold"
          onClick={handleAdd}
        >
          Tải lên Banner mới
        </Button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 p-4 bg-primary-light/30 border border-primary-light rounded-2xl text-primary">
          <PictureOutlined />
          <span className="font-bold text-sm">Lưu ý: Kích thước banner tối ưu cho trang chủ là 1920x800 pixel. Hệ thống sẽ tự động điều chỉnh theo khung hình.</span>
        </div>

        <Table 
          columns={columns} 
          dataSource={banners.sort((a,b) => a.order - b.order)} 
          rowKey="id" 
          pagination={false}
          className="border border-gray-50 rounded-xl overflow-hidden"
        />
      </div>

      <Modal
        title={editingBanner ? 'Cập nhật Banner' : 'Thêm Banner mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item label="Chọn hình ảnh Banner" required>
            <Upload.Dragger multiple={false} maxCount={1} action="/api/upload" listType="picture">
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="ant-upload-text">Kéo thả hoặc click để chọn file ảnh</p>
              <p className="ant-upload-hint">Định dạng hỗ trợ: JPG, PNG, WEBP (Max 2MB)</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item name="title" label="Tiêu đề Banner" rules={[{ required: true }]}>
             <Input placeholder="Ghi chú tên banner để dễ quản lý..." />
          </Form.Item>

          <Form.Item name="link" label="Đường dẫn điều hướng (URL)" initialValue="/">
             <Input placeholder="VD: /san-pham hoặc https://..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="status" label="Hiển thị ngay" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>
            <Form.Item name="order" label="Thứ tự hiển thị">
              <Input type="number" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
