"use client";

import React, { useState } from 'react';
import { Tabs, Button, Card, Row, Col, Modal, Form, Input, Upload, message, Breadcrumb, Space, Tag, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined, VideoCameraOutlined, PictureOutlined, PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';

const initialImages = [
  { id: 1, url: '/images/about.png', title: 'Nhà máy Sản xuất' },
  { id: 2, url: '/images/farm.png', title: 'Hoạt động chăn nuôi' },
  { id: 3, url: '/images/banner1.png', title: 'Sản phẩm chủ lực' },
  { id: 4, url: '/images/news-1.png', title: 'Sự kiện kỷ niệm' },
];

const initialVideos = [
  { id: 1, url: 'https://youtube.com/watch?v=example', title: 'Phim giới thiệu SANFOVET', thumbnail: '/images/about.png' },
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
          title: values.title
        };
        setImages([...images, newImg]);
        message.success('Đã thêm ảnh vào thư viện');
      } else {
        const newVid = {
          id: Date.now(),
          url: values.url,
          title: values.title,
          thumbnail: '/images/about.png'
        };
        setVideos([...videos, newVid]);
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
          <h1 className="text-2xl font-black text-sanfovet-dark mt-2">Video & Hình ảnh Trang chủ</h1>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={handleAdd}
          className="rounded-lg font-bold"
        >
          {activeTab === 'images' ? 'Tải lên hình ảnh' : 'Thêm video mới'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="custom-admin-tabs"
          items={[
            {
              key: 'images',
              label: (
                <span className="flex items-center gap-2">
                  <PictureOutlined /> Hình ảnh Gallery
                </span>
              ),
              children: (
                <div className="p-4">
                  <Row gutter={[24, 24]}>
                    {images.map(img => (
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
                          className="rounded-xl overflow-hidden shadow-sm border-gray-100"
                        >
                          <Card.Meta 
                            title={<span className="text-sm font-bold">{img.title}</span>} 
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
                <span className="flex items-center gap-2">
                  <VideoCameraOutlined /> Video Showcase
                </span>
              ),
              children: (
                <div className="p-4">
                   <Row gutter={[24, 24]}>
                    {videos.map(vid => (
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
                            <div className="flex flex-col justify-between py-1">
                               <div>
                                  <h4 className="font-black text-sanfovet-dark text-lg leading-tight mb-2">{vid.title}</h4>
                                  <code className="text-xs text-gray-400 block truncate w-48">{vid.url}</code>
                               </div>
                               <Space>
                                  <Button size="small" icon={<EyeOutlined />}>Xem thử</Button>
                                  <Button size="small" danger icon={<DeleteOutlined />} onClick={() => setVideos(videos.filter(v => v.id !== vid.id))}>Gỡ bỏ</Button>
                               </Space>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            }
          ]}
        />
      </div>

      <Modal
        title={activeTab === 'images' ? 'Tải lên hình ảnh mới' : 'Thêm video mới'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu dữ liệu"
        cancelText="Bỏ qua"
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Form.Item name="title" label="Tên gọi / Chú thích" rules={[{ required: true }]}>
            <Input placeholder="Nhập tiêu đề cho item này..." />
          </Form.Item>
          
          {activeTab === 'images' ? (
            <Form.Item label="Chọn tập tin ảnh">
               <Upload listType="picture-card" maxCount={1}>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
               </Upload>
            </Form.Item>
          ) : (
            <Form.Item name="url" label="Link Video (YouTube / Embed)" rules={[{ required: true }]}>
               <Input placeholder="Dán link video tại đây..." prefix={<PlayCircleOutlined className="text-red-500" />} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
