"use client";

import React from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

export default function ContactContent({ settings }: { settings: any }) {
   const [formData, setFormData] = React.useState({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      messageBox: '',
   });
   const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
   const [feedback, setFeedback] = React.useState('');

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      if (status === 'error') setStatus('idle');
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === 'submitting') return;

      setStatus('submitting');
      setFeedback('');

      try {
         const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });
         const result = await res.json();

         if (res.ok) {
            setStatus('success');
            setFeedback(result.message || 'Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.');
            setFormData({ fullName: '', phoneNumber: '', emailAddress: '', messageBox: '' });
         } else {
            setStatus('error');
            setFeedback(result.error || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
         }
      } catch {
         setStatus('error');
         setFeedback('Không thể gửi. Vui lòng kiểm tra kết nối và thử lại.');
      }
   };

   return (
      <div className="bg-white min-h-screen">
         {/* Page Header */}
         <section className="bg-biotechvet-dark text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/farm.png')] bg-cover bg-center"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
               <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wider italic">Liên Hệ Biotechvet</h1>
               <p className="text-xl text-primary-light max-w-2xl mx-auto font-medium">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn 24/7.</p>
            </div>
         </section>

         <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               {/* Information Column */}
               <div className="space-y-12">
                  <h2 className="text-3xl font-black text-biotechvet-dark uppercase italic mb-8 tracking-tight">Thông Tin Trụ Sở</h2>

                  <div className="space-y-8">
                     <div className="flex gap-6 items-start group">
                        <div className="w-14 h-14 bg-biotechvet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Địa chỉ trụ sở chính</h4>
                           <p className="text-lg font-bold text-biotechvet-dark leading-relaxed">{settings?.addressHN || 'Cụm CN Liên Phương, Xã Hồng Vân, Thường Tín, Hà Nội'}</p>
                        </div>
                     </div>

                     <div className="flex gap-6 items-start group">
                        <div className="w-14 h-14 bg-biotechvet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                           <Phone size={24} />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Điện thoại hỗ trợ</h4>
                           <p className="text-lg font-bold text-biotechvet-dark leading-relaxed">{settings?.hotline1 || '024 66861629'} / {settings?.hotline2 || '097 499 9204'}</p>
                        </div>
                     </div>

                     <div className="flex gap-6 items-start group">
                        <div className="w-14 h-14 bg-biotechvet-alt rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                           <Mail size={24} />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email phản hồi</h4>
                           <p className="text-lg font-bold text-biotechvet-dark leading-relaxed underline">{settings?.email || 'pkd.biotechvet@gmail.com'}</p>
                        </div>
                     </div>
                  </div>

                  {/* Branch Information */}
                  {settings?.addressHCM && (
                     <div className="bg-biotechvet-alt p-10 rounded-[40px] border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-black text-biotechvet-dark mb-4 uppercase tracking-wider">Chi nhánh Miền Nam</h3>
                        <div className="space-y-4">
                           <p className="text-gray-600 font-medium leading-relaxed flex items-center gap-3"><MapPin size={16} className="text-primary" /> {settings.addressHCM}</p>
                           {settings.hotline2 && <p className="text-gray-600 font-medium flex items-center gap-3"><Phone size={16} className="text-primary" /> {settings.hotline2}</p>}
                        </div>
                     </div>
                  )}

                  {/* Technical Support */}
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-10 rounded-[40px] border border-primary/20 shadow-sm">
                     <h3 className="text-xl font-black text-biotechvet-dark mb-6 uppercase tracking-wider">Hỗ Trợ Kỹ Thuật</h3>
                     <div className="space-y-5">
                        <div className="flex gap-4 items-start">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm">
                              <Phone size={18} />
                           </div>
                           <div>
                              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Tư vấn sản phẩm</p>
                              <p className="text-gray-700 font-bold">{settings?.hotline1}</p>
                           </div>
                        </div>
                        <div className="flex gap-4 items-start">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shrink-0 shadow-sm">
                              <Mail size={18} />
                           </div>
                           <div>
                              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Email hỗ trợ</p>
                              <p className="text-gray-700 font-bold">{settings?.support?.doctorEmail}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4">
                     {settings?.social?.facebook && (
                        <a href={settings.social.facebook} target="_blank" className="flex items-center gap-3 bg-blue-600 text-white font-black py-4 px-8 rounded-full text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                           <FacebookOutlined className="text-xl" /> Kết nối Facebook
                        </a>
                     )}
                     {settings?.social?.youtube && (
                        <a href={settings.social.youtube} target="_blank" className="flex items-center gap-3 bg-red-600 text-white font-black py-4 px-8 rounded-full text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                           <YoutubeOutlined className="text-xl" /> Kênh YouTube
                        </a>
                     )}
                  </div>
               </div>

               {/* Form Column */}
               <div className="bg-white rounded-[48px] p-10 md:p-14 border border-gray-100 shadow-2xl relative overflow-hidden group h-fit">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                  <div className="flex items-center gap-4 mb-10">
                     <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <MessageSquare size={24} />
                     </div>
                     <h3 className="text-2xl font-black text-biotechvet-dark uppercase tracking-tight italic">Gửi Tin Nhắn</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label htmlFor="fullName" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Họ và tên *</label>
                           <input id="fullName" name="fullName" type="text" placeholder="Nhập họ tên của bạn" value={formData.fullName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required={true} />
                        </div>
                        <div>
                           <label htmlFor="phoneNumber" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Số điện thoại *</label>
                           <input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Nhập số điện thoại" value={formData.phoneNumber} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required={true} />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="emailAddress" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Địa chỉ Email</label>
                        <input id="emailAddress" name="emailAddress" type="email" placeholder="Nhập địa chỉ email" value={formData.emailAddress} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" />
                     </div>
                     <div>
                        <label htmlFor="messageBox" className="block text-[10px] font-black uppercase text-gray-400 tracking-[2px] mb-2 px-4 italic">Nội dung yêu cầu *</label>
                        <textarea id="messageBox" name="messageBox" rows={5} placeholder="Bạn cần chúng tôi hỗ trợ gì?" value={formData.messageBox} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300" required></textarea>
                     </div>
                     {status === 'success' && (
                        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700">
                           <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                           <p className="text-sm font-semibold leading-relaxed">{feedback}</p>
                        </div>
                     )}
                     {status === 'error' && (
                        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                           <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500" />
                           <p className="text-sm font-semibold leading-relaxed">{feedback}</p>
                        </div>
                     )}
                     <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[3px] transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {status === 'submitting' ? (
                           <><Loader2 size={18} className="animate-spin" /> Đang gửi...</>
                        ) : (
                           <><Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Gửi yêu cầu ngay</>
                        )}
                     </button>
                  </form>
               </div>
            </div>

            {/* SLOGAN */}
            <div className="bg-biotechvet-alt p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center mt-24">
               <h3 className="text-3xl md:text-4xl font-black text-biotechvet-dark italic uppercase tracking-wider leading-tight mb-4">
                  Chất lượng Là Cam Kết
               </h3>
               <p className="text-lg text-biotechvet-dark font-bold">
                  Cùng BiotechVet - Nâng cao giá trị chăn nuôi Việt Nam
               </p>
            </div>

            {/* Google Maps */}
            <div className="mt-24 w-full h-[500px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
               {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3727.9957!2d105.8652!3d20.8305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCụm+CN+Li%C3%AAn+Ph%C6%B0%C6%A1ng%2C+X%C3%A3+H%E1%BB%93ng+V%C3%A2n%2C+Th%C6%B0%E1%BB%9Dng+T%C3%ADn%2C+H%C3%A0+N%E1%BB%99i!5e0!3m2!1svi!2svn!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ BiotechVet - Cụm CN Liên Phương, Xã Hồng Vân, Thường Tín, Hà Nội"
               /> */}
               <a
                  href={settings.googleMapsLink || "https://maps.app.goo.gl/p8Nbw6RqdTMXPVBaA"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block overflow-hidden cursor-pointer h-full"
                  title={'Mở Google Maps để chỉ đường'}
               >
                  <iframe
                     src={settings.googleMapsEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6007.076767417964!2d105.72458297685907!3d20.93151888069375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134527a3a6e8bed%3A0x5a2dd7517891760d!2zQ8O0bmcgVHkgQ3AgQ8O0bmcgTmdo4buHIFNpbmggSOG7jWMgVGjDuiBZ!5e1!3m2!1svi!2s!4v1787994357704!5m2!1svi!2s"}
                     width="100%"
                     height="100%"
                     style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     title={'Bản đồ BiotechVet - Cụm CN Liên Phương, Xã Hồng Vân, Thường Tín, Hà Nội'}
                  />
               </a>
            </div>
         </div>
      </div>
   );
}
