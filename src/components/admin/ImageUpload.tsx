"use client";

import React, { useState, useEffect } from 'react';
import { Upload, App as AntdApp, Image as AntImage } from 'antd';
import { PlusOutlined, DeleteOutlined, LoadingOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { uploadFile } from '@/lib/supabase/storage';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  aspectRatio?: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Tải ảnh lên',
  aspectRatio = '1/1',
}) => {
  const { message: messageApi } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);
  const [previewVisible, setPreviewVisible] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp';
    if (!isJpgOrPng) messageApi.error('Bạn chỉ có thể tải lên file JPG/PNG/WEBP!');
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) messageApi.error('Hình ảnh phải nhỏ hơn 5MB!');
    return isJpgOrPng && isLt2M;
  };

  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
  };

  const customUpload = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    try {
      setLoading(true);
      const path = `uploads/${Date.now()}-${file.name}`;
      // Use originFileObj if available (recommended by Ant Design)
      const rawFile = (file as any).originFileObj || file;
      const url = await uploadFile(rawFile as File, path, (progress) => {
        onProgress({ percent: progress });
      });
      setImageUrl(url);
      onChange?.(url);
      onSuccess?.('ok');
    } catch (error) {
      console.error('Upload error:', error);
      messageApi.error('Tải ảnh lên thất bại!');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageUrl(undefined);
    onChange?.('');
  };

  return (
    /*
     * Outer div: tạo aspect-ratio bằng cách set width + aspect-ratio.
     * Vì aspect-ratio chỉ hoạt động khi height chưa bị fix, ta dùng
     * position: relative + padding trick thay thế để đảm bảo cross-browser.
     */
    <div
      className="relative w-full rounded-2xl border-2 border-dashed border-gray-100 
                 hover:border-primary transition-all bg-gray-50/50 overflow-hidden group"
      style={{ aspectRatio }}
    >
      {/* 
        * Layer fill: absolute full-size, chứa toàn bộ nội dung.
        * Ant Design Upload sẽ render bên trong div này với width/height rõ ràng.
        */}
      <div className="absolute inset-0">
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={customUpload}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          className="upload-fill"
        >
          {/* Trigger area: fill toàn bộ */}
          <div
            className="flex items-center justify-center cursor-pointer w-full h-full"
            style={{ width: '100%', height: '100%' }}
          >
            {imageUrl ? (
              <div className="relative w-full h-full p-2 group/img">
                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-full h-full object-contain rounded-xl"
                />
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 
                             group-hover/img:opacity-100 transition-opacity 
                             flex items-center justify-center rounded-xl 
                             backdrop-blur-[2px] m-1"
                >
                  <div className="flex gap-2">
                    <div
                      className="w-9 h-9 bg-white rounded-xl flex items-center 
                                 justify-center text-primary shadow-lg cursor-pointer 
                                 hover:scale-110 transition-transform"
                    >
                      <PlusOutlined className="text-lg" />
                    </div>
                    <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewVisible(true);
                      }}
                    >
                      <EyeOutlined className="text-lg" />
                    </button>
                    <button
                      className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                      onClick={onRemove}
                    >
                      <DeleteOutlined className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <div
                  className="w-12 h-12 bg-white rounded-2xl flex items-center 
                             justify-center text-primary shadow-sm 
                             group-hover:shadow-md transition-all mb-3"
                >
                  {loading ? (
                    <LoadingOutlined className="text-xl" />
                  ) : (
                    <PlusOutlined className="text-xl" />
                  )}
                </div>
                <div
                  className="text-[11px] font-black uppercase tracking-widest 
                             text-gray-400 text-center"
                >
                  {label}
                </div>
                <div
                  className="mt-2 text-[10px] text-gray-300 font-bold 
                             uppercase tracking-tighter"
                >
                  JPG, PNG, WEBP • MAX 5MB
                </div>
              </div>
            )}
          </div>
        </Upload>
      </div>

      {/* Hidden image for preview */}
      {imageUrl && (
        <AntImage
          src={imageUrl}
          style={{ display: 'none' }}
          preview={{
            visible: previewVisible,
            onOpenChange: (visible) => setPreviewVisible(visible),
          }}
        />
      )}

      {/*
       * CSS global để Ant Design Upload fill container.
       * Đặt trực tiếp trong component để tránh file CSS riêng.
       */}
      <style>{`
        .upload-fill,
        .upload-fill .ant-upload-wrapper,
        .upload-fill .ant-upload-select,
        .upload-fill .ant-upload {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;