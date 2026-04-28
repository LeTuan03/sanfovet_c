"use client";

import React, { useState, useMemo } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, Select, 
  Tag, Tooltip, Row, Col, Divider, Switch, App 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined
} from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import ImageUpload from '@/components/admin/ImageUpload';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';
import { adminFetch } from '@/lib/api';
import { Product, Category } from '@/types';
import { useAdminLoading } from '@/lib/AdminLoadingContext';
import TextArea from 'antd/es/input/TextArea';

function ProductManagementContent() {
  const { modal, message } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load data from API
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          adminFetch('/api/data/products'),
          adminFetch('/api/data/categories')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setData(prodData);
        setCategories(catData);
      } catch (error) {
        console.log(error);
        message.error('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [message]);

  // Derived filtered data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const cat = categories.find(c => c.id === item.categoryId);
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        cat?.name.toLowerCase().includes(query.toLowerCase())
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

  const showModal = (record?: Product) => {
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
    form.validateFields().then(async (values) => {
      let newData = [];
      if (editingId) {
        newData = data.map((item: Product) => (item.id === editingId ? { ...item, ...values } : item));
      } else {
        const newProduct = {
          ...values,
          id: Math.max(...data.map((p: Product) => p.id), 0) + 1,
          slug: values.name.toLowerCase().replaceAll(' ', '-').replaceAll(/[^\w-]/g, ''),
        };
        newData = [newProduct, ...data];
      }

      // Save to API
      setGlobalLoading(true);
      try {
        const res = await adminFetch('/api/data/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        });
        if (res.ok) {
          setData(newData);
          message.success(editingId ? 'Cập nhật sản phẩm thành công' : 'Thêm sản phẩm mới thành công');
          setIsModalOpen(false);
        } else {
          throw new Error('Lỗi khi lưu dữ liệu');
        }
      } catch (error) {
        console.log(error);
        message.error('Lỗi khi lưu dữ liệu');
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const handleDelete = (id: number) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        const newData = data.filter((item: Product) => item.id !== id);
        setGlobalLoading(true);
        try {
          const res = await adminFetch('/api/data/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
          });
          if (res.ok) {
            setData(newData);
            message.success('Đã xóa sản phẩm');
          } else {
            throw new Error('Lỗi khi xóa dữ liệu  ');
          }
        } catch (error) {
          console.log(error);
          message.error('Lỗi khi xóa dữ liệu');
        } finally {
          setGlobalLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0 shadow-sm group-hover:shadow-md transition-all">
             <img src={record.image} alt={text} className="w-full h-full object-contain p-1" />
          </div>
          <div>
            <div className="font-bold text-biotechvet-dark text-sm">{text}</div>
            <div className="flex items-center gap-2 mt-1">
              {record.featured && <Tag color="gold" className="text-[9px] px-1.5 font-black border-none bg-amber-100 text-amber-700 m-0">NỔI BẬT</Tag>}
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
        const cat = categories.find((c: Category) => c.id === id);
        return <Tag className="font-black px-3 py-1 rounded-lg uppercase text-[10px] border-none bg-emerald-50 text-emerald-700 m-0 tracking-wider shadow-sm">{cat?.name.split(',')[0] || 'Khác'}</Tag>;
      },
    },

    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: Product) => (
        <Space size="small">
          <Tooltip title="Xem trang khách">
             <Button 
               icon={<EyeOutlined />} 
               onClick={() => window.open(`/san-pham/${record.slug}`)}
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
           loading={loading}
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
            <span className="text-2xl font-black uppercase italic tracking-tighter text-biotechvet-dark">
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
        <Form form={form} layout="vertical" className="mt-6 px-4 pb-8">
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                <Input className="rounded-xl py-2 font-bold" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true }]}>
                <Select 
                  options={categories.map(c => ({ label: c.name, value: c.id }))}
                  className="w-full"
                  placeholder="Chọn danh mục"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
               <Form.Item name="featured" label="Nổi bật" valuePropName="checked">
                  <Switch className="bg-gray-200" />
               </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
               <Form.Item name="image" label="Hình ảnh sản phẩm">
                  <ImageUpload label="Chọn ảnh sản phẩm" />
               </Form.Item>
            </Col>
          </Row>

          <Divider>
            <span className="text-[11px] font-black uppercase tracking-widest text-primary">Thông số sản phẩm</span>
          </Divider>

          <Form.List name="specifications">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          label="Tên thông số (VD: THÀNH PHẦN)"
                          rules={[{ required: true, message: 'Nhập tên thông số' }]}
                        >
                          <Input placeholder="Nhập tiêu đề..." className="rounded-xl font-bold text-primary" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'content']}
                          label="Mô tả chi tiết"
                          rules={[{ required: true, message: 'Nhập mô tả' }]}
                        >
                          <TextArea 
                            rows={4} 
                            placeholder="Nhập chi tiết thông số..." 
                            className="rounded-xl" 
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />} 
                      onClick={() => remove(name)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
                <Button 
                  type="dashed" 
                  onClick={() => add()} 
                  block 
                  icon={<PlusOutlined />}
                  className="rounded-xl h-12 border-2 border-dashed border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all"
                >
                  THÊM THUỘC TÍNH / THÔNG SỐ
                </Button>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </motion.div>
  );
}


export default function ProductManagement() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <ProductManagementContent />
    </React.Suspense>
  );
}
