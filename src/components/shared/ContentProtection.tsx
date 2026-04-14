"use client";

import React, { useEffect } from 'react';
import { Modal, message } from 'antd';
import { ShieldX } from 'lucide-react';

export default function ContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      Modal.error({
        title: <span className="text-red-600 font-black uppercase italic tracking-tight">Cảnh báo bảo mật</span>,
        content: (
          <div className="py-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-4 mx-auto">
               <ShieldX size={32} />
            </div>
            <p className="text-center font-bold text-gray-700 leading-relaxed">
              Xin lỗi, nội dung trên website SANFOVET đã được bảo vệ bản quyền. 
              Vui lòng không sao chép hoặc kiểm tra mã nguồn.
            </p>
          </div>
        ),
        okText: "Tôi đã hiểu",
        okButtonProps: { className: "bg-primary font-bold px-8 rounded-full h-10 border-none" },
        centered: true,
        className: "content-protection-modal"
      });
    };

    // Only apply in production or if not local
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', handleContextMenu);
    } else {
      // In development, maybe just a console log or a less intrusive warning
      console.log('Content protection is active (right-click blocked in production)');
      // For testing purposes, uncomment this:
      // document.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
}
