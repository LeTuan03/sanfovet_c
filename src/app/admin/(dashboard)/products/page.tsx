"use client";

import React, { useState, useMemo } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, Select, 
  Tag, Tooltip, Row, Col, Tabs, Divider, Switch, App 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined, SearchOutlined, MinusCircleOutlined 
} from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { products, categories } from '@/lib/data';
import CKEditor from '@/components/admin/CKEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';

export default function ProductManagement() {
  const { modal, message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState([...products]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const cat = categories.find(c => c.id === item.categoryId);
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        cat?.name.toLowerCase().includes(query.toLowerCase()) ||
        item.registrationNo?.toLowerCase().includes(query.toLowerCase())
      );
    });
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
        message.success('Cập nhật sản phẩm thành công');
      } else {
        const newProduct = {
          ...values,
          id: Math.max(...data.map((p) => p.id), 0) + 1,
          slug: values.name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
        };
        setData([newProduct, ...data]);
        message.success('Thêm sản phẩm mới thành công');
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setData(data.filter((item) => item.id !== id));
        message.success('Đã xóa sản phẩm');
      },
    });
  };

  const columns = [
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm group-hover:shadow-md transition-all">
             <img src={record.image} alt={text} className="w-full h-full object-contain p-1" />
          </div>
          <div>
            <div className="font-bold text-sanfovet-dark text-sm">{text}</div>
            <div className="flex items-center gap-2 mt-1">
              {record.featured && <Tag color="gold" className="text-[9px] px-1.5 font-black border-none bg-amber-100 text-amber-700 m-0">NỔI BẬT</Tag>}
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{record.volume}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (id: number) => {
        const cat = categories.find((c) => c.id === id);
        return <Tag className="font-black px-3 py-1 rounded-lg uppercase text-[10px] border-none bg-emerald-50 text-emerald-700 m-0 tracking-wider shadow-sm">{cat?.name.split(',')[0] || 'Khác'}</Tag>;
      },
    },
    {
       title: 'Đăng ký số',
       dataIndex: 'registrationNo',
       key: 'registrationNo',
       render: (v: string) => <span className="font-bold text-gray-400 text-[11px] tracking-tight bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{v}</span>
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Xem trang khách">
             <Button 
               icon={<EyeOutlined />} 
               type="text" 
               className="text-gray-400 hover:text-primary hover:bg-emerald-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all" 
             />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => showModal(record)} 
             />
          </Tooltip>
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <AdminPageHeader 
        title="Quản lý Sản phẩm"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Quản lý Sản phẩm' },
        ]}
        onSearch={(val) => updateUrl({ q: val })}
        primaryAction={{
          label: 'Thêm Sản phẩm',
          onClick: () => showModal(),
          icon: <PlusOutlined />
        }}
      />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
        <Table 
           columns={columns} 
           dataSource={filteredData} 
           rowKey="id" 
           className="admin-table"
           pagination={{
              current: page,
              pageSize: 10,
              className: "p-6 border-t border-gray-50",
              showSizeChanger: false,
              onChange: (p) => updateUrl({ page: p })
           }}
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {editingId ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-sanfovet-dark">
              {editingId ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}
            </span>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        okText={editingId ? "Cập nhật dữ liệu" : "Thêm mới ngay"}
        cancelText="Hủy bỏ"
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
        centered
        okButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px] border-none shadow-lg shadow-primary/20" }}
        cancelButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px]" }}
      >
        <Form form={form} layout="vertical" className="mt-6 px-4">
          <Tabs defaultActiveKey="1" className="admin-tabs custom-admin-tabs" items={[
            {
              key: '1',
              label: <span className="font-black px-2 uppercase text-[11px] tracking-widest">Thông tin cơ bản</span>,
              children: (
                <div className="py-4">
                  <Row gutter={24}>
                    <Col span={10}>
                      <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input className="rounded-xl py-2 font-bold" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
                        <Select 
                          options={categories.map(c => ({ label: c.name, value: c.id }))}
                          className="w-full"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                       <Form.Item name="featured" label="Nổi bật" valuePropName="checked">
                          <Switch className="bg-gray-200" />
                       </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                       <Form.Item name="tagline" label="Khẩu hiệu / Tóm tắt">
                          <Input className="rounded-xl py-2" />
                       </Form.Item>
                    </Col>
                    <Col span={12}>
                       <Form.Item name="registrationNo" label="Số đăng ký">
                          <Input className="rounded-xl py-2" />
                       </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                       <Form.Item name="image" label="Hình ảnh sản phẩm">
                          <ImageUpload label="Chọn ảnh sản phẩm" />
                       </Form.Item>
                    </Col>
                    <Col span={12}>
                       <Form.Item name="volume" label="Quy cách đóng gói">
                          <Input className="rounded-xl py-2" />
                       </Form.Item>
                    </Col>
                  </Row>
                </div>
              )
            },
            {
              key: '2',
              label: <span className="font-black px-2 uppercase text-[11px] tracking-widest">Thành phần & Công dụng</span>,
              children: (
                <div className="py-4">
                  <Form.Item label="Danh sách thành phần">
                    <Form.List name="ingredients">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                              <Form.Item {...restField} name={[name, 'name']} rules={[{ required: true, message: 'Tên thành phần' }]}>
                                <Input placeholder="Tên chất" className="rounded-lg py-1.5 px-3 min-w-[200px]" />
                              </Form.Item>
                              <Form.Item {...restField} name={[name, 'amount']} rules={[{ required: true, message: 'Lượng' }]}>
                                <Input placeholder="100" className="rounded-lg py-1.5 px-3 w-[100px]" />
                              </Form.Item>
                              <Form.Item {...restField} name={[name, 'unit']} rules={[{ required: true, message: 'Đv' }]}>
                                <Input placeholder="mg" className="rounded-lg py-1.5 px-3 w-[80px]" />
                              </Form.Item>
                              <Button type="text" onClick={() => remove(name)} icon={<MinusCircleOutlined />} danger />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="rounded-xl mt-2">
                            Thêm thành phần
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                  <Form.Item name="characteristics" label="Đặc tính sản phẩm">
                    <CKEditor placeholder="Nhập các đặc tính nổi bật của sản phẩm..." />
                  </Form.Item>
                  <Form.Item name="indications" label="Chỉ định / Công dụng">
                    <CKEditor placeholder="Nhập chi tiết các chỉ định và công dụng điều trị..." />
                  </Form.Item>
                </div>
              )
            },
            {
              key: '3',
              label: <span className="font-black px-2 uppercase text-[11px] tracking-widest">Liều lượng & Hướng dẫn</span>,
              children: (
                <div className="py-4">
                  <Row gutter={24}>
                     <Col span={12}>
                        <Form.Item name={['dosage', 'route']} label="Đường dùng (Tiêm bắp, uống...)">
                           <Input className="rounded-xl py-2" />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item name={['dosage', 'duration']} label="Liệu trình">
                           <Input className="rounded-xl py-2" />
                        </Form.Item>
                     </Col>
                  </Row>
                  <Form.Item label="Chi tiết liều lượng theo loài">
                    <Form.List name={['dosage', 'byAnimal']}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                              <Form.Item {...restField} name={[name, 'animal']} rules={[{ required: true, message: 'Loài' }]}>
                                <Input placeholder="Heo con" className="rounded-lg py-1.5 px-3 min-w-[200px]" />
                              </Form.Item>
                              <Form.Item {...restField} name={[name, 'dose']} rules={[{ required: true, message: 'Liều' }]}>
                                <Input placeholder="1ml/10kg TT" className="rounded-lg py-1.5 px-3 min-w-[200px]" />
                              </Form.Item>
                              <Button type="text" onClick={() => remove(name)} icon={<MinusCircleOutlined />} danger />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="rounded-xl mt-2">
                            Thêm liều theo loài
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                  <Row gutter={24}>
                    <Col span={12}>
                       <Form.Item name="formulation" label="Dạng bào chế">
                          <Input className="rounded-xl py-2" />
                       </Form.Item>
                    </Col>
                    <Col span={12}>
                       <Form.Item name="withdrawalPeriod" label="Thời gian ngưng thuốc">
                          <Input className="rounded-xl py-2" />
                       </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="storage" label="Bảo quản">
                     <Input className="rounded-xl py-2" />
                  </Form.Item>
                </div>
              )
            }
          ]} />
        </Form>
      </Modal>
    </motion.div>
  );
}
