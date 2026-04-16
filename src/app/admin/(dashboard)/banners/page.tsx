"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Modal, Form, Input, Upload, Switch, Tooltip, Row, Col, App } from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  PictureOutlined, ArrowUpOutlined, ArrowDownOutlined, 
  SearchOutlined, LinkOutlined 
} from '@ant-design/icons';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';

const initialBanners = [
  { id: 1, image: '/images/banner1.png', title: 'Banner Trang chủ 1', link: '/san-pham', order: 1, status: true },
  { id: 2, image: '/images/banner2.png', title: 'Banner Khuyến mãi tháng 4', link: '/tin-tuc', order: 2, status: true },
  { id: 3, image: '/images/banner1.png', title: 'Banner Tuyển dụng miền Trung', link: '/tuyen-dung', order: 3, status: false },
];

export default function AdminBannersPage() {
  const { modal, message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [banners, setBanners] = useState(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [form] = Form.useForm();

  // Derived filtered data
  const filteredData = useMemo(() => {
    return banners
      .filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.link.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => a.order - b.order);
  }, [banners, query]);

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

  const columns = [
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      render: (order: number) => <span className="font-black text-gray-400 text-xs">#{order}</span>
    },
    {
      title: 'Preview',
      dataIndex: 'image',
      key: 'image',
      width: 160,
      render: (text: string) => (
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-1 overflow-hidden shadow-sm aspect-[2/1] flex items-center justify-center">
          <img src={text} alt="banner" className="w-full h-full object-cover rounded-lg" />
        </div>
      ),
    },
    {
      title: 'Tên Banner / Ghi chú',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-black text-sanfovet-dark text-sm italic">{text}</span>
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <code className="text-[10px] text-primary bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 font-bold flex items-center gap-2 w-fit">
          <LinkOutlined /> {link}
        </code>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: boolean) => <Switch checked={status} size="small" className="bg-gray-200" />,
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleEdit(record)} 
             />
          </Tooltip>
          <div className="flex flex-col gap-1">
            <Button icon={<ArrowUpOutlined className="text-[10px]" />} size="small" className="h-4 w-6 p-0 text-gray-400 hover:text-primary" />
            <Button icon={<ArrowDownOutlined className="text-[10px]" />} size="small" className="h-4 w-6 p-0 text-gray-400 hover:text-primary" />
          </div>
          <Tooltip title="Xóa">
             <Button 
               icon={<DeleteOutlined />} 
               type="text" 
               danger 
               className="hover:bg-red-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleDelete(record.id)} 
             />
          </Tooltip>
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
    modal.confirm({
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
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <AdminPageHeader 
        title="Banner Slider"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Banner / Slider' },
        ]}
        onSearch={(val) => updateUrl({ q: val })}
        primaryAction={{
          label: 'Tải lên Banner',
          onClick: handleAdd,
          icon: <PlusOutlined />
        }}
      />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 shadow-sm">
            <PictureOutlined className="text-xl" />
            <div className="text-xs font-bold leading-relaxed">
              <span className="uppercase tracking-widest block mb-1 opacity-70">Gợi ý kỹ thuật:</span>
              Kích thước banner tối ưu cho trang chủ là <span className="text-primary font-black">1920x800 pixel</span>. Hãy đảm bảo hình ảnh có độ phân giải cao để hiển thị tốt nhất trên màn hình lớn.
            </div>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredData} 
            rowKey="id" 
            className="admin-table"
            pagination={{
              current: page,
              pageSize: 5,
              className: "p-6 border-t border-gray-50",
              onChange: (p) => updateUrl({ page: p })
            }}
          />
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3 pt-4 px-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {editingBanner ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-sanfovet-dark">
              {editingBanner ? 'Cập nhật Banner' : 'Tải lên Banner mới'}
            </span>
          </div>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu dữ liệu"
        cancelText="Hủy bỏ"
        width={700}
        className="admin-modal"
        okButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px] border-none shadow-lg shadow-primary/20" }}
        cancelButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px]" }}
      >
        <Form form={form} layout="vertical" className="mt-6 px-2">
          <Form.Item label="Hình ảnh Banner" required>
            <Upload.Dragger multiple={false} maxCount={1} action="/api/upload" listType="picture" className="rounded-[24px!important] overflow-hidden">
              <p className="ant-upload-drag-icon">
                <PlusOutlined className="text-primary" />
              </p>
              <p className="ant-upload-text text-sanfovet-dark font-bold">Kéo thả hoặc click để chọn file ảnh</p>
              <p className="ant-upload-hint text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">JPG, PNG, WEBP (Max 2MB)</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item name="title" label="Tiêu đề / Ghi chú" rules={[{ required: true }]}>
             <Input className="rounded-xl py-2 font-bold" placeholder="Ghi chú tên banner để dễ quản lý..." />
          </Form.Item>

          <Form.Item name="link" label="Đường dẫn điều hướng (URL)" initialValue="/">
             <Input className="rounded-xl py-2 italic" placeholder="VD: /san-pham hoặc https://..." />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
               <Form.Item name="status" label="Trạng thái hiển thị" valuePropName="checked" initialValue={true}>
                 <Switch checkedChildren="ON" unCheckedChildren="OFF" />
               </Form.Item>
            </Col>
            <Col span={12}>
               <Form.Item name="order" label="Thứ tự">
                 <Input type="number" className="rounded-xl" />
               </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </motion.div>
  );
}
