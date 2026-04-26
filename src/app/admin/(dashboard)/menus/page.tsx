"use client";

import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, Breadcrumb, Divider, Row, Col, Tooltip, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, GlobalOutlined, LinkOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { adminFetch } from '@/lib/api';

function AdminMenusPageContent() {
  const { message: msg, modal } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  // Load from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await adminFetch('/api/data/menus');
        const data = await res.json();
        setMenus(data || []);
      } catch (error) {
        msg.error('Không thể tải dữ liệu menu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [msg]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    const rawFiltered = menus.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.link.toLowerCase().includes(query.toLowerCase())
    );

    const finalData: any[] = [];
    const rawFilteredIds = new Set(rawFiltered.map(item => item.id));

    // Lấy các menu gốc (không có parent, hoặc parent không nằm trong kết quả tìm kiếm)
    const rootItems = rawFiltered.filter(item => !item.parent || !rawFilteredIds.has(item.parent));
    
    // Sắp xếp các menu gốc theo thứ tự
    rootItems.sort((a, b) => a.order - b.order);

    // Đệ quy để lấy các menu con và gộp ngay dưới menu cha
    const buildTree = (parents: any[]) => {
       parents.forEach(p => {
          finalData.push(p);
          const children = rawFiltered.filter(item => item.parent === p.id);
          if (children.length > 0) {
             children.sort((a, b) => a.order - b.order);
             buildTree(children);
          }
       });
    };

    buildTree(rootItems);
    return finalData;
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
    form.setFieldsValue({
      order: menus.length + 1,
      position: 'header',
      hasMega: false,
      isButton: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const parsedValues = {
        ...values,
        order: values.order !== undefined && values.order !== '' ? Number(values.order) : menus.length + 1,
      };

      let newData = [];
      if (editingItem) {
        newData = menus.map(m => m.id === editingItem.id ? { ...m, ...parsedValues } : m);
      } else {
        const newItem = {
          ...parsedValues,
          id: Date.now(),
          status: true
        };
        newData = [...menus, newItem];
      }

      try {
        const res = await adminFetch('/api/data/menus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (res.ok) {
          setMenus(newData);
          msg.success(editingItem ? 'Cập nhật menu thành công' : 'Thêm menu mới thành công');
          setIsModalOpen(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        msg.error('Lỗi khi lưu dữ liệu');
      }
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
          <span className="text-biotechvet-dark">{text}</span>
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
                   modal.confirm({
                      title: 'Xác nhận xóa menu?',
                      content: `Bạn có chắc chắn muốn xóa menu "${record.name}" không?`,
                      okText: 'Xóa ngay',
                      cancelText: 'Hủy',
                      okType: 'danger',
                      onOk: async () => {
                         const newData = menus.filter((m: any) => m.id !== record.id);
                         try {
                           const res = await adminFetch('/api/data/menus', {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify(newData),
                           });
                           if (res.ok) {
                             setMenus(newData);
                             msg.success('Đã xóa menu thành công');
                           } else {
                             throw new Error();
                           }
                         } catch (error) {
                           msg.error('Lỗi khi xóa dữ liệu');
                         }
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
          <h1 className="text-2xl font-black text-biotechvet-dark mt-2 tracking-tight uppercase italic">Cơ cấu Điều hướng Web</h1>
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
          loading={loading}
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
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        centered
        okText="Lưu lại"
        cancelText="Hủy bỏ"
        className="rounded-[32px]"
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

          <Row gutter={24}>
            <Col span={12}>
               <Form.Item name="hasMega" label="Mega Menu (Sản phẩm)">
                 <Select className="rounded-xl h-10">
                    <Select.Option value={false}>Không</Select.Option>
                    <Select.Option value={true}>Kích hoạt Mega Menu</Select.Option>
                 </Select>
               </Form.Item>
            </Col>
            <Col span={12}>
               <Form.Item name="isButton" label="Kiểu hiển thị (Nút bấm)">
                  <Select className="rounded-xl h-10">
                    <Select.Option value={false}>Link bình thường</Select.Option>
                    <Select.Option value={true}>Dạng Nút nổi bật</Select.Option>
                  </Select>
               </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}


export default function AdminMenusPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <AdminMenusPageContent />
    </React.Suspense>
  );
}
