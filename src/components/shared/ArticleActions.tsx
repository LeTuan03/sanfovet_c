"use client";

import React from 'react';
import { Share2, Printer } from 'lucide-react';
import { message } from 'antd';

export default function ArticleActions() {
  const [messageApi, contextHolder] = message.useMessage();

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(window.location.href);
      messageApi.success('Đã sao chép liên kết bài viết!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      messageApi.error('Không thể sao chép liên kết.');
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex gap-2 no-print">
        <button
          onClick={handleCopy}
          title="Sao chép liên kết"
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
        >
          <Share2 size={14} />
        </button>
        <button
          onClick={handlePrint}
          title="In bài viết"
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
        >
          <Printer size={14} />
        </button>
      </div>
    </>
  );
}
