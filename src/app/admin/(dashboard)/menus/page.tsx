"use client";

import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message, Breadcrumb, Divider, Row, Col, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, GlobalOutlined, LinkOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const initialMenus = [
  { id: 1, name: 'Trang chủ', link: '/', parent: null, position: 'header', order: 1, status: true },
  { id: 2, name: 'Sản phẩm', link: '/san-pham', parent: null, position: 'header', order: 2, status: true },
  { id: 3, name: 'Kháng sinh tiêm', link: '/san-pham?cat=1', parent: 2, position: 'header', order: 3, status: true },
  { id: 4, name: 'Thuốc bổ trợ', link: '/san-pham?cat=2', parent: 2, position: 'header', order: 4, status: true },
  { id: 5, name: 'Giới thiệu', link: '/gioi-thieu', parent: null, position: 'header', order: 5, status: true },
  { id: 6, name: 'Tin tức', link: '/tin-tuc', parent: null, position: 'both', order: 6, status: true },
  { id: 7, name: 'Liên hệ', link: '/lien-he', parent: null, position: 'both', order: 7, status: true },
  { id: 8, name: 'Chính sách bảo mật', link: '/privacy', parent: null, position: 'footer', order: 8, status: true },
];

export default function AdminMenusPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [menus, setMenus] = useState(initialMenus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  // Derived filtered data
  const filteredData = useMemo(() => {
    return menus.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => a.order - b.order);
  }, [menus, query]);

  const updateUrl = (params: { q?: string }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (params.q !== undefined) {
      if (params.q) newSearchParams.set('q', params.q);
      else newSearchParams.delete('q');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrl({ q: e.target.value });
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        setMenus(menus.map(m => m.id === editingItem.id ? { ...m, ...values } : m));
        message.success('Cập nhật menu thành công');
      } else {
        const newItem = {
          ...values,
          id: Date.now(),
          order: menus.length + 1,
          status: true
        };
        setMenus([...menus, newItem]);
        message.success('Thêm menu mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  const columns = [
    {
      title: 'Tên hiển thị',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span style={{ paddingLeft: record.parent ? 32 : 0, fontWeight: record.parent ? 'normal' : 'bold' }}>
          {record.parent && <span className="text-gray-300 mr-2 text-xs">└─</span>}
          <span className="text-sanfovet-dark">{text}</span>
        </span>
      ),
    },
    {
      title: 'Đường dẫn (Link)',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => <code className="text-[10px] text-primary bg-primary-light px-2 py-0.5 rounded-md font-bold">{link}</code>
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      render: (pos: string) => {
        const colors: Record<string, string> = { header: 'blue', footer: 'purple', both: 'green' };
        const labels: Record<string, string> = { header: 'Header Only', footer: 'Footer Only', both: 'Toàn bộ' };
        return <Tag color={colors[pos]} className="uppercase text-[9px] font-black tracking-widest px-2">{labels[pos]}</Tag>;
      },
      filters: [
        { text: 'Header', value: 'header' },
        { text: 'Footer', value: 'footer' },
        { text: 'Cả hai', value: 'both' },
      ],
      onFilter: (value: any, record: any) => record.position === value,
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      align: 'center' as const,
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} className="text-blue-500" />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                onClick={() => {
                   Modal.confirm({
                      title: 'Xác nhận xóa menu?',
                      content: `Bạn có chắc chắn muốn xóa menu "${record.name}" không?`,
                      okText: 'Xóa ngay',
                      cancelText: 'Hủy',
                      okType: 'danger',
                      onOk: () => {
                         setMenus(menus.filter(m => m.id !== record.id));
                         message.success('Đã xóa menu thành công');
                      }
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
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Menu' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight uppercase italic">Cơ cấu Điều hướng Web</h1>

        </div>
        <div className="flex gap-4">
           <Input 
              prefix={<SearchOutlined className="text-gray-300" />} 
              placeholder="Tìm kiếm menu..." 
              className="w-64 rounded-xl border-gray-100 shadow-sm"
              defaultValue={query}
              onChange={handleSearch}
           />
           <Button 
             type="primary" 
             icon={<PlusOutlined />} 
             size="large"
             className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
             onClick={handleAdd}
           >
             Thêm Menu mới
           </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 min-h-[500px]">
        <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center gap-3">
          <GlobalOutlined className="text-primary text-xl" />
          <div className="flex flex-col">
            <span className="text-gray-800 font-bold text-sm">Chế độ quản lý phân cấp</span>
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">Hệ thống hỗ trợ Menu đa cấp (Nested Menus) và phân loại theo khu vực hiển thị</span>
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id" 
          pagination={false}
          className="border border-gray-50 rounded-2xl overflow-hidden shadow-xs"
        />

        <Divider dashed className="my-10" />
        <div className="flex justify-between items-center px-4">
           <div className="flex gap-4">
              <Space className="text-[10px] font-black text-gray-300 uppercase"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Header</Space>
              <Space className="text-[10px] font-black text-gray-300 uppercase"><div className="w-2 h-2 bg-purple-400 rounded-full"></div> Footer</Space>
           </div>
           <div className="italic text-[10px] text-gray-300 font-bold uppercase tracking-widest">
              * Thay đổi thứ tự bằng cách chỉnh sửa số STT
           </div>
        </div>
      </div>

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingItem ? 'Cập nhật' : 'Thêm'} Menu item</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        okText="Lưu lại"
        cancelText="Hủy bỏ"
        className="rounded-[32px] top-[100px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item name="name" label="Tên hiển thị" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input placeholder="Ví dụ: Trang chủ, Tin tức..." className="rounded-xl py-3 px-4 font-bold" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="order" label="Thứ tự STT" initialValue={0}>
                <Input type="number" className="rounded-xl py-3 px-4 text-center font-bold" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="link" label="Đường dẫn (Link / Slug)" rules={[{ required: true, message: 'Vui lòng nhập link' }]}>
            <Input placeholder="/tin-tuc" prefix={<LinkOutlined className="text-gray-300" />} className="rounded-xl py-2 px-4" />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="position" label="Vị trí hiển thị" initialValue="header">
                <Select className="rounded-xl h-10">
                  <Select.Option value="header">Header Menu</Select.Option>
                  <Select.Option value="footer">Footer Menu Only</Select.Option>
                  <Select.Option value="both">Cả Header & Footer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="parent" label="Menu cha (Nếu có)">
                <Select placeholder="Chọn menu cấp trên" className="rounded-xl h-10" allowClear>
                  {menus.filter(m => !m.parent).map(m => (
                    <Select.Option key={m.id} value={m.id}>{m.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
