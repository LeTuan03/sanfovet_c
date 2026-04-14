"use client";

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, X, Send, Globe, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function FloatingContact() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-[999]">
        <a 
          href="tel:0974999204" 
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-gradient-to-br from-[#e53935] to-[#c62828] animate-bounce-slow"
          title="Gọi hotline"
        >
          <Phone size={22} />
        </a>
        <a 
          href="mailto:pkd.sanfovet@gmail.com" 
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-gradient-to-br from-accent to-[#e65100]"
          title="Gửi email"
        >
          <Mail size={22} />
        </a>
        <a 
          href="https://zalo.me/0974999204" 
          target="_blank" 
          rel="noopener"
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-gradient-to-br from-[#0068ff] to-[#0052cc]"
          title="Chat Zalo"
        >
          <span className="text-[0.7rem] font-bold">Zalo</span>
        </a>
        <a 
          href="https://facebook.com/sanfovet" 
          target="_blank" 
          rel="noopener"
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-gradient-to-br from-[#1877f2] to-[#0d47a1]"
          title="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 bg-gradient-to-br from-primary to-primary-dark"
          title="Liên hệ nhanh"
        >
          <MessageSquare size={22} />
        </button>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-[380px] right-6 w-11 h-11 bg-primary text-white rounded-full items-center justify-center shadow-md z-[998] transition-all hover:bg-primary-dark hover:-translate-y-0.5 animate-fade-in"
          title="Quay lại đầu trang"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      )}

      {/* Contact Popup Overlay */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[20px] p-9 max-w-[480px] w-full relative shadow-2xl animate-scale-up">
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={18} />
            </button>
            <h3 className="text-[1.4rem] font-bold mb-5 text-primary-dark leading-tight">Liên hệ nhanh</h3>
            <div className="space-y-4 mb-6">
               <div className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                 <Phone size={16} className="mt-1 text-primary shrink-0" />
                 <div><strong>Hotline:</strong> 097 499 9204</div>
               </div>
               <div className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                 <Phone size={16} className="mt-1 text-primary shrink-0" />
                 <div><strong>Điện thoại:</strong> 024 66861629</div>
               </div>
               <div className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                 <Mail size={16} className="mt-1 text-primary shrink-0" />
                 <div><strong>Email:</strong> pkd.sanfovet@gmail.com</div>
               </div>
               <div className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                 <Globe size={16} className="mt-1 text-primary shrink-0" />
                 <div><strong>Website:</strong> www.sanfovet.com.vn</div>
               </div>
               <div className="flex items-start gap-2.5 text-[0.9rem] text-gray-700">
                 <MapPin size={16} className="mt-1 text-primary shrink-0" />
                 <div><strong>Địa chỉ:</strong> Cụm CN Liên Phương, Xã Hồng Vân, Hà Nội</div>
               </div>
            </div>
            <Link 
              href="/lien-he" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold transition-all shadow-md active:scale-95"
              onClick={() => setIsPopupOpen(false)}
            >
              <Send size={16} /> Gửi tin nhắn
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
