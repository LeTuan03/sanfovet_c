"use client";

import React, { useState } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, Select, message, 
  Tag, Tooltip, Row, Col, Tabs, Divider, Switch 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined, SearchOutlined, MinusCircleOutlined 
} from '@ant-design/icons';
import { products, categories } from '@/lib/data';
import CKEditor from '@/components/admin/CKEditor';

export default function ProductManagement() {
  const [data, setData] = useState([...products]);
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
    Modal.confirm({
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
             <img src={record.image} alt={text} className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-bold text-gray-800">{text}</div>
            {record.featured && <Tag color="gold" className="text-[0.5rem] px-1 font-black">NỔI BẬT</Tag>}
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
        return <Tag color="green" className="font-bold px-3 py-0.5 rounded-full uppercase text-[0.6rem]">{cat?.name.split(',')[0] || 'Khác'}</Tag>;
      },
    },
    {
       title: 'Đăng ký số',
       dataIndex: 'registrationNo',
       key: 'registrationNo',
       render: (v: string) => <span className="font-medium text-gray-400 text-xs">{v}</span>
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Xem trang khách">
             <Button icon={<EyeOutlined />} type="text" className="text-gray-400 hover:text-primary" />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50"
               onClick={() => showModal(record)} 
             />
          </Tooltip>
          <Tooltip title="Xóa">
             <Button 
               icon={<DeleteOutlined />} 
               type="text" 
               danger 
               className="hover:bg-red-50"
               onClick={() => handleDelete(record.id)} 
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
           <h2 className="text-2xl font-black text-sanfovet-dark uppercase tracking-tight italic">Quản lý Sản phẩm</h2>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[0.65rem] mt-1">Hệ thống đồng bộ dữ liệu sản phẩm thú y thời gian thực</p>
        </div>
        <div className="flex gap-4">
           <Input 
              prefix={<SearchOutlined className="text-gray-300" />} 
              placeholder="Tìm kiếm nhanh..." 
              className="w-64 rounded-xl border-gray-100 shadow-sm"
           />
           <Button 
             type="primary" 
             icon={<PlusOutlined />} 
             onClick={() => showModal()}
             className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
           >
             Thêm Sản phẩm
           </Button>
        </div>
      </div>

      <Table 
         columns={columns} 
         dataSource={data} 
         rowKey="id" 
         className="shadow-sm border border-gray-50 rounded-2xl overflow-hidden bg-white"
         pagination={{
            pageSize: 8,
            className: "px-6 pb-4",
         }}
      />

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{editingId ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={1100}
        okText="Lưu dữ liệu"
        cancelText="Hủy bỏ"
        className="rounded-[32px] top-[40px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Tabs defaultActiveKey="1" className="admin-tabs" items={[
            {
              key: '1',
              label: <span className="font-bold px-4 uppercase text-[0.75rem] tracking-widest">Thông tin cơ bản</span>,
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
                          className="h-10"
                          options={categories.map(c => ({ label: c.name, value: c.id }))}
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
                       <Form.Item name="image" label="URL Hình ảnh (hoặc tên file trong /images/)">
                          <Input className="rounded-xl py-2" placeholder="/images/product-x.png" />
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
              label: <span className="font-bold px-4 uppercase text-[0.75rem] tracking-widest">Thành phần & Công dụng</span>,
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
              label: <span className="font-bold px-4 uppercase text-[0.75rem] tracking-widest">Liều lượng & Hướng dẫn</span>,
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
    </div>
  );
}
