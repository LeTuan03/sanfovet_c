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

    // Enable protection by default for both dev and prod in this handover version
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Add additional protection against common shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        message.warning({
          content: 'Phím tắt đã bị vô hiệu hóa để bảo vệ nội dung.',
          className: 'custom-message-warning'
        });
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
