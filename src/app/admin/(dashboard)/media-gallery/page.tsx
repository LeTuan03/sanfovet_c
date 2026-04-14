"use client";

import React, { useState } from 'react';
import { Tabs, Button, Card, Row, Col, Modal, Form, Input, Upload, message, Breadcrumb, Space, Tag, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined, VideoCameraOutlined, PictureOutlined, PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';

const initialImages = [
  { id: 1, url: '/images/about.png', title: 'Nhà máy Sản xuất', order: 1 },
  { id: 2, url: '/images/farm.png', title: 'Hoạt động chăn nuôi', order: 2 },
  { id: 3, url: '/images/banner1.png', title: 'Sản phẩm chủ lực', order: 3 },
  { id: 4, url: '/images/news-1.png', title: 'Sự kiện kỷ niệm', order: 4 },
];

const initialVideos = [
  { id: 1, url: 'https://youtube.com/watch?v=example', title: 'Phim giới thiệu SANFOVET', thumbnail: '/images/about.png', order: 1 },
];

export default function AdminMediaGalleryPage() {
  const [images, setImages] = useState(initialImages);
  const [videos, setVideos] = useState(initialVideos);
  const [activeTab, setActiveTab] = useState('images');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleDeleteImage = (id: number) => {
    Modal.confirm({
      title: 'Xóa hình ảnh?',
      content: 'Hình ảnh này sẽ không còn hiển thị ở Thư viện trang chủ.',
      onOk: () => {
        setImages(images.filter(img => img.id !== id));
        message.success('Đã xóa hình ảnh');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (activeTab === 'images') {
        const newImg = {
          id: Date.now(),
          url: '/images/banner2.png', // Mock URL
          title: values.title,
          order: values.order || 0
        };
        setImages([...images, newImg].sort((a,b) => (a.order || 0) - (b.order || 0)));
        message.success('Đã thêm ảnh vào thư viện');
      } else {
        const newVid = {
          id: Date.now(),
          url: values.url,
          title: values.title,
          thumbnail: values.thumbnail || '/images/about.png',
          order: values.order || 0
        };
        setVideos([...videos, newVid].sort((a,b) => (a.order || 0) - (b.order || 0)));
        message.success('Đã thêm video thành công');
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb items={[{ title: 'Admin' }, { title: 'Quản lý Video & Hình ảnh' }]} />
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2 tracking-tight">Video & Hình ảnh Trang chủ</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Quản lý nội dung visual tại mục Thư viện trang chủ</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleAdd}
          className="rounded-xl font-bold h-10 px-6 uppercase tracking-wider text-xs shadow-lg shadow-primary/20"
        >
          {activeTab === 'images' ? 'Tải lên hình ảnh' : 'Thêm video mới'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="admin-custom-tabs"
          items={[
            {
              key: 'images',
              label: (
                <span className="flex items-center gap-2 font-bold px-4 uppercase text-[0.7rem] tracking-widest">
                  <PictureOutlined /> Hình ảnh Gallery
                </span>
              ),
              children: (
                <div className="p-4">
                  <Row gutter={[24, 24]}>
                    {images.sort((a, b) => (a.order || 0) - (b.order || 0)).map(img => (
                      <Col xs={24} sm={12} md={8} lg={6} key={img.id}>
                        <Card
                          hoverable
                          cover={
                            <div className="h-40 overflow-hidden bg-gray-50 flex items-center justify-center">
                              <img alt={img.title} src={img.url} className="w-full h-full object-cover" />
                            </div>
                          }
                          actions={[
                            <EyeOutlined key="view" />,
                            <DeleteOutlined key="delete" className="text-red-500" onClick={() => handleDeleteImage(img.id)} />,
                          ]}
                          className="rounded-2xl overflow-hidden shadow-sm border-gray-100"
                        >
                          <Card.Meta 
                            title={
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-bold truncate">{img.title}</span> 
                                <Tag color="orange" className="m-0 text-[10px]">#{img.order || 0}</Tag>
                              </div>
                            } 
                            description={<Tag color="blue" className="text-[10px] uppercase font-black">Trang chủ</Tag>}
                          />
                        </Card>
                      </Col>
                    ))}
                    {images.length === 0 && <div className="w-full py-12"><Empty description="Chưa có hình ảnh nào" /></div>}
                  </Row>
                </div>
              )
            },
            {
              key: 'videos',
              label: (
                <span className="flex items-center gap-2 font-bold px-4 uppercase text-[0.7rem] tracking-widest">
                  <VideoCameraOutlined /> Video Showcase
                </span>
              ),
              children: (
                <div className="p-4">
                   <Row gutter={[24, 24]}>
                    {videos.sort((a, b) => (a.order || 0) - (b.order || 0)).map(vid => (
                      <Col xs={24} sm={12} md={12} lg={12} key={vid.id}>
                        <Card
                          hoverable
                          className="rounded-2xl overflow-hidden border-gray-100 shadow-sm"
                          styles={{ body: { padding: 20 } }}
                        >
                          <div className="flex gap-6">
                            <div className="w-40 h-24 bg-sanfovet-dark rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden group">
                               <img src={vid.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform" />
                               <PlayCircleOutlined className="text-white text-3xl relative z-10" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between py-1">
                               <div>
                                  <div className="flex justify-between items-start">
                                     <h4 className="font-black text-sanfovet-dark text-lg leading-tight mb-2">{vid.title}</h4>
                                     <Tag color="orange" className="text-[10px]">Thứ tự: {vid.order || 0}</Tag>
                                  </div>
                                  <code className="text-xs text-gray-400 block truncate w-48 italic">{vid.url}</code>
                               </div>
                               <Space className="mt-4">
                                  <Button size="small" icon={<EyeOutlined />} className="rounded-lg">Xem thử</Button>
                                  <Button size="small" danger icon={<DeleteOutlined />} onClick={() => setVideos(videos.filter(v => v.id !== vid.id))} className="rounded-lg">Gỡ bỏ</Button>
                               </Space>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                    {videos.length === 0 && <div className="w-full py-12"><Empty description="Chưa có video nào" /></div>}
                  </Row>
                </div>
              )
            }
          ]}
        />
      </div>

      <Modal
        title={<span className="text-xl font-black uppercase italic tracking-tight">{activeTab === 'images' ? 'Thêm hình ảnh Gallery' : 'Thêm video mới'}</span>}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu dữ liệu"
        cancelText="Bỏ qua"
        centered
        width={600}
        className="rounded-[32px]"
      >
        <Form form={form} layout="vertical" className="mt-8">
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item name="title" label="Tiêu đề / Chú thích" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                <Input placeholder="Nhập tiêu đề cho item này..." className="rounded-xl py-3 px-4 font-bold" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="order" label="Thứ tự" initialValue={0}>
                <Input type="number" className="rounded-xl py-3 px-4 text-center font-bold" />
              </Form.Item>
            </Col>
          </Row>
          
          {activeTab === 'images' ? (
            <Form.Item label="Chọn tập tin ảnh">
               <Upload.Dragger listType="picture" maxCount={1} className="rounded-2xl">
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined className="text-primary text-4xl" />
                  </p>
                  <p className="ant-upload-text font-bold">Kéo thả hoặc click để tải lên</p>
                  <p className="ant-upload-hint text-[10px] uppercase font-bold tracking-widest text-gray-400">JPG, PNG, WEBP (MAX 5MB)</p>
               </Upload.Dragger>
            </Form.Item>
          ) : (
            <>
              <Form.Item name="url" label="Link Video (YouTube / Embed)" rules={[{ required: true, message: 'Vui lòng nhập link video' }]}>
                 <Input placeholder="Dán link video tại đây..." prefix={<PlayCircleOutlined className="text-red-500" />} className="rounded-xl py-3 px-4" />
              </Form.Item>
              <Form.Item name="thumbnail" label="URL Ảnh đại diện (Thumbnail)">
                 <Input placeholder="Ví dụ: /images/custom-thumb.png" className="rounded-xl py-3 px-4" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}
