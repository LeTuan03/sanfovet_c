"use client";

import React from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-sanfovet-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
           <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider italic">Liên Hệ Sanfovet</h1>
           <p className="text-xl text-primary-light max-w-2xl mx-auto font-medium">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn 24/7.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Information Column */}
          <div className="space-y-12">
             <h2 className="text-3xl font-black text-sanfovet-dark uppercase italic mb-8 tracking-tight">Thông Tin Trụ Sở</h2>
             
             <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                   <div className="w-14 h-14 bg-sanfovet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Địa chỉ trụ sở chính</h4>
                      <p className="text-lg font-bold text-sanfovet-dark leading-relaxed">Cụm CN Liên Phương, Xã Hồng Vân, Thường Tín, Hà Nội</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start group">
                   <div className="w-14 h-14 bg-sanfovet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone size={24} />
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Điện thoại hỗ trợ</h4>
                      <p className="text-lg font-bold text-sanfovet-dark leading-relaxed">024 66861629 / 097 499 9204</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start group">
                   <div className="w-14 h-14 bg-sanfovet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={24} />
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email phản hồi</h4>
                      <p className="text-lg font-bold text-sanfovet-dark leading-relaxed underline">pkd.sanfovet@gmail.com</p>
                   </div>
                </div>
             </div>

             {/* Branch Information */}
             <div className="bg-sanfovet-alt p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-black text-sanfovet-dark mb-4 uppercase tracking-wider">Chi nhánh Miền Nam</h3>
                <div className="space-y-4">
                   <p className="text-gray-600 font-medium leading-relaxed flex items-center gap-3"><MapPin size={16} className="text-primary" /> Hố Nai, Trảng Bom, Đồng Nai</p>
                   <p className="text-gray-600 font-medium flex items-center gap-3"><Phone size={16} className="text-primary" /> 0936 100 008</p>
                </div>
             </div>

             {/* Social Links */}
             <div className="flex gap-4">
                <button type="button" className="flex items-center gap-3 bg-blue-600 text-white font-black py-4 px-8 rounded-full text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                   <FacebookOutlined className="text-xl" /> Kết nối Facebook
                </button>
                <button type="button" className="flex items-center gap-3 bg-red-600 text-white font-black py-4 px-8 rounded-full text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                   <YoutubeOutlined className="text-xl" /> Kênh YouTube
                </button>
             </div>
          </div>

          {/* Form Column */}
          <div className="bg-white rounded-[48px] p-10 md:p-14 border border-gray-100 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                   <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-black text-sanfovet-dark uppercase tracking-tight italic">Gửi Tin Nhắn</h3>
             </div>

             <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label htmlFor="fullName" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Họ và tên *</label>
                      <input id="fullName" type="text" placeholder="Nhập họ tên của bạn" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required />
                   </div>
                   <div>
                      <label htmlFor="phoneNumber" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Số điện thoại *</label>
                      <input id="phoneNumber" type="tel" placeholder="Nhập số điện thoại" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required />
                   </div>
                </div>
                <div>
                   <label htmlFor="emailAddress" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Địa chỉ Email</label>
                   <input id="emailAddress" type="email" placeholder="Nhập địa chỉ email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" />
                </div>
                <div>
                   <label htmlFor="messageBox" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Nội dung yêu cầu *</label>
                   <textarea id="messageBox" rows={5} placeholder="Bạn cần chúng tôi hỗ trợ gì?" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[3px] transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3 group">
                   <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Gửi yêu cầu ngay
                </button>
             </form>
          </div>
        </div>

        {/* Google Maps (Placeholder frame) */}
        <div className="mt-24 w-full h-[500px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white group relative">
           <img src="/images/farm.png" className="w-full h-full object-cover blur-[2px] opacity-40" alt="Map loading" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md px-10 py-5 rounded-full border border-gray-100 shadow-xl flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                 <span className="text-sanfovet-dark font-black uppercase text-sm tracking-widest italic tracking-tighter">Bản đồ Sanfovet tại Hà Nội</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
