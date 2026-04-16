"use client";

import React, { useState, useMemo } from 'react';
import { 
  Tabs, Button, Card, Row, Col, Modal, Form, Input, 
  Upload, Space, Tag, Empty,
  Switch, Tooltip, Badge, Select, Image, App
} from 'antd';
import { 
  PlusOutlined, DeleteOutlined, VideoCameraOutlined, 
  PictureOutlined, PlayCircleOutlined, EyeOutlined,
  SearchOutlined, EditOutlined
} from '@ant-design/icons';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';

const initialImages = [
  { id: 1, url: '/images/about.png', title: 'Nhà máy Sản xuất', order: 1, status: 'active' },
  { id: 2, url: '/images/farm.png', title: 'Hoạt động chăn nuôi', order: 2, status: 'active' },
  { id: 3, url: '/images/banner1.png', title: 'Sản phẩm chủ lực', order: 3, status: 'hidden' },
  { id: 4, url: '/images/news-1.png', title: 'Sự kiện kỷ niệm', order: 4, status: 'active' },
];

const initialVideos = [
  { id: 1, url: 'https://youtube.com/watch?v=example', title: 'Phim giới thiệu SANFOVET', thumbnail: '/images/about.png', order: 1, status: 'active' },
];

export default function AdminMediaGalleryPage() {
  const { modal, message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const activeTab = searchParams.get('tab') || 'images';

  const [images, setImages] = useState(initialImages);
  const [videos, setVideos] = useState(initialVideos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [form] = Form.useForm();

  // URL Sync
  const updateUrl = (params: { tab?: string; q?: string }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (params.tab) newSearchParams.set('tab', params.tab);
    if (params.q !== undefined) {
      if (params.q) newSearchParams.set('q', params.q);
      else newSearchParams.delete('q');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleTabChange = (key: string) => {
    updateUrl({ tab: key });
  };

  const handleSearch = (val: string) => {
    updateUrl({ q: val });
  };

  // Filtered Data
  const filteredImages = useMemo(() => {
    return images.filter(img => img.title.toLowerCase().includes(query.toLowerCase()))
                 .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [images, query]);

  const filteredVideos = useMemo(() => {
    return videos.filter(vid => vid.title.toLowerCase().includes(query.toLowerCase()))
                 .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [videos, query]);

  const handleView = (url: string) => {
    setPreviewImage(url);
    setPreviewOpen(true);
  };

  const handleVideoPreview = (url: string) => {
    window.open(url, '_blank');
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteImage = (id: number) => {
    modal.confirm({
      title: 'Xóa hình ảnh?',
      content: 'Hình ảnh này sẽ không còn hiển thị ở Thư viện trang chủ.',
      okText: 'Xóa',
      okType: 'danger',
      onOk: () => {
        setImages(images.filter(img => img.id !== id));
        message.success('Đã xóa hình ảnh');
      }
    });
  };

  const handleDeleteVideo = (id: number) => {
    modal.confirm({
      title: 'Xóa video?',
      content: 'Video này sẽ không còn hiển thị ở mục Gallery.',
      okText: 'Xóa',
      okType: 'danger',
      onOk: () => {
        setVideos(videos.filter(v => v.id !== id));
        message.success('Đã xóa video');
      }
    });
  };

  const toggleStatus = (id: number, type: 'images' | 'videos') => {
    if (type === 'images') {
      setImages(images.map(img => img.id === id ? { ...img, status: img.status === 'active' ? 'hidden' : 'active' } : img));
    } else {
      setVideos(videos.map(v => v.id === id ? { ...v, status: v.status === 'active' ? 'hidden' : 'active' } : v));
    }
    message.success('Đã cập nhật trạng thái hiển thị');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (activeTab === 'images') {
        if (editingId) {
          setImages(images.map(img => img.id === editingId ? { ...img, ...values } : img));
          message.success('Đã cập nhật hình ảnh');
        } else {
          const newImg = {
            id: Date.now(),
            url: values.url || '/images/about.png', // Mock URL
            title: values.title,
            status: values.status || 'active',
            order: values.order || 0
          };
          setImages([...images, newImg]);
          message.success('Đã thêm ảnh vào thư viện');
        }
      } else {
        if (editingId) {
          setVideos(videos.map(v => v.id === editingId ? { ...v, ...values } : v));
          message.success('Đã cập nhật video');
        } else {
          const newVid = {
            id: Date.now(),
            url: values.url,
            title: values.title,
            thumbnail: values.thumbnail || '/images/about.png',
            status: values.status || 'active',
            order: values.order || 0
          };
          setVideos([...videos, newVid]);
          message.success('Đã thêm video thành công');
        }
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
        title="Video & Hình ảnh"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Video & Hình ảnh' },
        ]}
        onSearch={handleSearch}
        primaryAction={{
          label: activeTab === 'images' ? 'Tải lên hình ảnh' : 'Thêm video mới',
          onClick: handleAdd,
          icon: <PlusOutlined />
        }}
      />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 p-2">
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          className="admin-tabs custom-admin-tabs"
          items={[
            {
              key: 'images',
              label: (
                <span className="flex items-center gap-2 font-black px-4 uppercase text-[11px] tracking-widest">
                  <PictureOutlined /> Hình ảnh Gallery
                </span>
              ),
              children: (
                <div className="p-6">
                  <Row gutter={[24, 24]}>
                    {filteredImages.map(img => (
                      <Col xs={24} sm={12} md={8} lg={6} key={img.id}>
                        <Card
                          hoverable
                          cover={
                            <div className="h-44 overflow-hidden bg-gray-50 flex items-center justify-center relative group">
                              <img alt={img.title} src={img.url} className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${img.status === 'hidden' ? 'opacity-40 grayscale' : ''}`} />
                              <div className="absolute inset-0 bg-sanfovet-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                 <Button shape="circle" size="large" icon={<EyeOutlined />} onClick={() => handleView(img.url)} className="border-none shadow-lg" />
                                 <Button shape="circle" size="large" icon={<EditOutlined />} onClick={() => handleEdit(img)} className="border-none shadow-lg text-blue-500" />
                                 <Button shape="circle" size="large" icon={<DeleteOutlined />} danger onClick={() => handleDeleteImage(img.id)} className="border-none shadow-lg" />
                              </div>
                              {img.status === 'hidden' && (
                                <div className="absolute top-4 left-4 z-10">
                                   <Tag color="default" className="m-0 font-black text-[9px] uppercase tracking-widest border-none bg-black/50 text-white backdrop-blur-md">ĐANG ẨN</Tag>
                                </div>
                              )}
                            </div>
                          }
                          className="rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all border-gray-100 group"
                          styles={{
                            body: {
                              padding: '16px 20px'
                            }
                          }}
                        >
                          <div className="flex justify-between items-start mb-3">
                             <div className="flex-1 mr-2">
                                <h4 className="text-sm font-black text-sanfovet-dark truncate m-0 italic">{img.title}</h4>
                             </div>
                             <Tag className="m-0 text-[10px] font-black tracking-tighter bg-amber-50 text-amber-600 border-none px-2 py-0.5 rounded-lg">#{img.order || 0}</Tag>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hiển thị Gallery</span>
                             <Switch size="small" checked={img.status === 'active'} onChange={() => toggleStatus(img.id, 'images')} className="bg-gray-200" />
                          </div>
                        </Card>
                      </Col>
                    ))}
                    {filteredImages.length === 0 && <div className="w-full py-20"><Empty description="Không tìm thấy hình ảnh nào" /></div>}
                  </Row>
                </div>
              )
            },
            {
              key: 'videos',
              label: (
                <span className="flex items-center gap-2 font-black px-4 uppercase text-[11px] tracking-widest">
                  <VideoCameraOutlined /> Video Showcase
                </span>
              ),
              children: (
                <div className="p-6">
                   <Row gutter={[24, 24]}>
                    {filteredVideos.map(vid => (
                      <Col xs={24} lg={12} key={vid.id}>
                        <Card
                          hoverable
                          className={`rounded-[28px] overflow-hidden border-gray-100 shadow-sm hover:shadow-xl transition-all group ${vid.status === 'hidden' ? 'bg-gray-50' : ''}`}
                          bodyStyle={{ padding: 0 }}
                        >
                          <div className="flex flex-col sm:flex-row h-full">
                            <div className="w-full sm:w-56 h-48 bg-sanfovet-dark shrink-0 flex items-center justify-center relative overflow-hidden group">
                               <img src={vid.thumbnail} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${vid.status === 'hidden' ? 'opacity-20 grayscale' : 'opacity-60'}`} />
                               <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl group-hover:scale-110 group-hover:bg-primary transition-all shadow-xl">
                                  <PlayCircleOutlined />
                               </div>
                               {vid.status === 'hidden' && (
                                 <div className="absolute top-4 left-4 z-20">
                                   <Tag color="default" className="m-0 font-black text-[9px] uppercase tracking-widest border-none bg-black/50 text-white backdrop-blur-md">ĐANG ẨN</Tag>
                                 </div>
                               )}
                            </div>
                            <div className="flex flex-1 flex-col justify-between p-6">
                               <div>
                                  <div className="flex justify-between items-start gap-4 mb-4">
                                     <h4 className={`font-black text-sanfovet-dark text-lg italic leading-tight ${vid.status === 'hidden' ? 'text-gray-400' : ''}`}>{vid.title}</h4>
                                     <Tag className="m-0 text-[10px] font-black tracking-tighter bg-amber-50 text-amber-600 border-none px-2 py-0.5 rounded-lg shrink-0">#{vid.order || 0}</Tag>
                                  </div>
                                  <code className="text-[10px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 block truncate w-full italic mb-6">
                                    {vid.url}
                                  </code>
                               </div>
                               <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                  <Space>
                                    <Tooltip title="Xem thử">
                                      <Button size="small" icon={<EyeOutlined />} onClick={() => handleVideoPreview(vid.url)} className="rounded-xl border-gray-200 h-9 px-4 text-xs font-bold" />
                                    </Tooltip>
                                    <Tooltip title="Chỉnh sửa">
                                      <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(vid)} className="rounded-xl border-gray-200 h-9 px-4 text-xs font-bold text-blue-500" />
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                      <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteVideo(vid.id)} className="rounded-xl border-gray-200 h-9 px-4 text-xs font-bold" />
                                    </Tooltip>
                                  </Space>
                                  <div className="flex items-center gap-2">
                                      <span className="text-[9px] font-black text-gray-400 tracking-widest uppercase">HIỂN THỊ</span>
                                      <Switch size="small" checked={vid.status === 'active'} onChange={() => toggleStatus(vid.id, 'videos')} className="bg-gray-200" />
                                  </div>
                               </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                    {filteredVideos.length === 0 && <div className="w-full py-20"><Empty description="Không tìm thấy video nào" /></div>}
                  </Row>
                </div>
              )
            }
          ]}
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3 pt-4 px-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {editingId ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-sanfovet-dark">
              {editingId ? (activeTab === 'images' ? 'Cập nhật hình ảnh' : 'Cập nhật video') : (activeTab === 'images' ? 'Thêm hình ảnh Gallery' : 'Thêm video mới')}
            </span>
          </div>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu dữ liệu"
        cancelText="Bỏ qua"
        width={750}
        className="admin-modal"
        okButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px] border-none shadow-lg shadow-primary/20" }}
        cancelButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px]" }}
      >
        <Form form={form} layout="vertical" className="mt-6 px-2">
          <Row gutter={24}>
            <Col span={14}>
              <Form.Item name="title" label="Tiêu đề / Chú thích" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                <Input placeholder="Nhập tiêu đề cho item này..." className="rounded-xl py-2 px-4 font-bold" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="Trạng thái" initialValue="active">
                <Select className="w-full" options={[
                  { label: 'Đang hiển thị', value: 'active' },
                  { label: 'Đang ẩn', value: 'hidden' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="order" label="Thứ tự" initialValue={0}>
                <Input type="number" className="rounded-xl py-2 px-4 text-center font-bold" />
              </Form.Item>
            </Col>
          </Row>
          
          {activeTab === 'images' ? (
            <>
               <Form.Item name="url" label="URL Hình ảnh (hoặc /images/...)">
                  <Input placeholder="Nhập đường dẫn ảnh..." prefix={<PictureOutlined />} className="rounded-xl py-2 px-4" />
               </Form.Item>
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tải lên tập tin mới</span>
                  <Upload.Dragger listType="picture" maxCount={1} className="rounded-[24px!important] overflow-hidden">
                     <p className="ant-upload-drag-icon">
                        <PictureOutlined className="text-primary" />
                     </p>
                     <p className="ant-upload-text font-bold text-sanfovet-dark">Kéo thả hoặc click để tải lên</p>
                     <p className="ant-upload-hint text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">JPG, PNG, WEBP (MAX 5MB)</p>
                  </Upload.Dragger>
               </div>
            </>
          ) : (
            <>
              <Form.Item name="url" label="Link Video (YouTube / Embed / MP4)" rules={[{ required: true, message: 'Vui lòng nhập link video' }]}>
                 <Input placeholder="Dán link video tại đây..." prefix={<PlayCircleOutlined className="text-red-500" />} className="rounded-xl py-2 px-4" />
              </Form.Item>
              <Form.Item name="thumbnail" label="URL Ảnh đại diện (Thumbnail)">
                 <Input placeholder="Ví dụ: /images/custom-thumb.png" className="rounded-xl py-2 px-4" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible: previewOpen, onVisibleChange: (vis) => setPreviewOpen(vis) }}>
          <Image src={previewImage} />
        </Image.PreviewGroup>
      </div>
    </motion.div>
  );
}
