"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Tag, Input, Modal, Form, Select, Switch, Tooltip, App, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/config';
import { uploadFile } from '@/lib/supabase/storage';

export interface Catalogue {
  id?: number;
  title: string;
  size: string;
  type: string;
  link: string;
  created_at?: string;
}

function AdminCatalogueContent() {
  const { modal, message } = App.useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Catalogue | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  const fetchCatalogues = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('catalogues')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST106') {
          message.warning('Bảng catalogues chưa được tạo trên Supabase');
          setCatalogues([]);
        } else {
          throw error;
        }
      } else {
        setCatalogues(data || []);
      }
    } catch (error: any) {
      console.error(error);
      message.error('Không thể tải dữ liệu catalogue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogues();
  }, [message]);

  const filteredData = catalogues.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const updateUrl = (params: { q?: string; page?: number }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    if (params.q !== undefined) {
      if (params.q) newSearchParams.set('q', params.q);
      else newSearchParams.delete('q');
      newSearchParams.set('page', '1');
    }
    
    if (params.page !== undefined) {
      newSearchParams.set('page', params.page.toString());
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const columns = [
    {
      title: 'Tiêu đề tài liệu',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <div className="font-bold text-biotechvet-dark text-sm">{text}</div>,
    },
    {
      title: 'Định dạng',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag className="font-black px-3 py-1 rounded-lg uppercase text-[10px] tracking-wider">{type}</Tag>,
    },
    {
      title: 'Dung lượng',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <a href={link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline line-clamp-1 max-w-[200px]">
          {link}
        </a>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: Catalogue) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
             <Button 
               icon={<EyeOutlined />} 
               type="text" 
               className="text-gray-400 hover:text-primary hover:bg-emerald-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all" 
               onClick={() => window.open(record.link, '_blank')}
             />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
             <Button 
               icon={<EditOutlined />} 
               type="text" 
               className="text-blue-500 hover:bg-blue-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleEdit(record)} 
             />
          </Tooltip>
          <Tooltip title="Xóa">
             <Button 
               icon={<DeleteOutlined />} 
               type="text" 
               danger 
               className="hover:bg-red-50 w-9 h-9 flex items-center justify-center rounded-xl transition-all"
               onClick={() => handleDelete(record)} 
             />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Catalogue) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setFileList(record.link ? [{ uid: '-1', name: 'Tài liệu hiện tại', status: 'done', url: record.link }] : []);
    setIsModalOpen(true);
  };

  const handleDelete = (record: Catalogue) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa "${record.title}" không?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const { error } = await supabase.from('catalogues').delete().eq('id', record.id);
          if (error) throw error;
          
          setCatalogues(catalogues.filter(c => c.id !== record.id));
          message.success('Đã xóa thành công');
        } catch (error) {
          console.error(error);
          message.error('Lỗi khi xóa tài liệu');
        }
      },
    });
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ type: 'PDF' });
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleUploadFile = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    setUploading(true);
    try {
      const url = await uploadFile(file as File, 'catalogues', onProgress);
      
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      form.setFieldsValue({ 
        link: url,
        size: `${sizeInMB} MB`
      });
      
      onSuccess?.(url);
      message.success('Tải lên thành công');
    } catch (error) {
      console.error(error);
      onError?.(error);
      message.error('Lỗi tải lên tài liệu');
    } finally {
      setUploading(false);
    }
  };

  const handleModalOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingItem?.id) {
          const { error } = await supabase
            .from('catalogues')
            .update(values)
            .eq('id', editingItem.id);
            
          if (error) throw error;
          message.success('Cập nhật thành công');
        } else {
          const { error } = await supabase
            .from('catalogues')
            .insert([values]);
            
          if (error) throw error;
          message.success('Thêm mới thành công');
        }
        
        setIsModalOpen(false);
        fetchCatalogues();
      } catch (error) {
        console.error(error);
        message.error('Lỗi khi lưu dữ liệu');
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <AdminPageHeader 
        title="Quản lý Catalogue & Tài liệu"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Quản lý Catalogue' },
        ]}
        onSearch={(val) => updateUrl({ q: val })}
        primaryAction={{
          label: 'Thêm tài liệu mới',
          onClick: handleAdd,
          icon: <PlusOutlined />
        }}
      />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          loading={loading}
          pagination={{ 
            current: page,
            pageSize: 10,
            className: "p-6 border-t border-gray-50",
            onChange: (p) => updateUrl({ page: p })
          }}
          className="admin-table"
        />
      </div>

      <Modal
        title={
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              {editingItem ? <EditOutlined /> : <PlusOutlined />}
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-biotechvet-dark">
              {editingItem ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
            </span>
          </div>
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={700}
        centered
        okText={editingItem ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy bỏ"
        okButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px] border-none shadow-lg shadow-primary/20", disabled: uploading }}
        cancelButtonProps={{ className: "rounded-xl h-11 px-8 font-bold uppercase tracking-widest text-[11px]" }}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-6 px-4"
        >
          <Form.Item
            name="title"
            label="Tiêu đề tài liệu"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
          >
            <Input className="rounded-xl py-2 font-bold" placeholder="VD: Catalogue Sản phẩm biotechvet 2026" />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Định dạng"
              rules={[{ required: true, message: 'Vui lòng chọn định dạng' }]}
            >
              <Select className="w-full" placeholder="Chọn định dạng...">
                <Select.Option value="PDF">PDF</Select.Option>
                <Select.Option value="DOCX">DOCX</Select.Option>
                <Select.Option value="XLSX">XLSX</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="size"
              label="Dung lượng"
              rules={[{ required: true, message: 'Vui lòng nhập dung lượng' }]}
            >
              <Input className="rounded-xl py-2" placeholder="VD: 24.5 MB" />
            </Form.Item>
          </div>

          <Form.Item label="Upload File (hoặc nhập link bên dưới)">
            <Upload 
              customRequest={handleUploadFile}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>Chọn file tải lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="link"
            label="Link tài liệu (URL)"
            rules={[{ required: true, message: 'Vui lòng nhập hoặc upload để lấy link' }]}
          >
            <Input className="rounded-xl py-2" placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
}

export default function AdminCataloguePage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>}>
      <AdminCatalogueContent />
    </React.Suspense>
  );
}
