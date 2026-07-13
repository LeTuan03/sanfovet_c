"use client";

import React from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const STORAGE_KEY = 'biotechvet:lead-popup:until';
const HIDE_MS = 24 * 60 * 60 * 1000; // hiện lại sau 1 ngày
const OPEN_DELAY_MS = 2000;

export default function LeadPopup() {
  const { language } = useLanguage();
  const en = language === 'en';

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    messageBox: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = React.useState('');

  // Persist "don't show again for 24h"
  const remember = React.useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_MS));
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const dismiss = React.useCallback(() => {
    remember();
    setOpen(false);
  }, [remember]);

  // Decide whether to open on first load
  React.useEffect(() => {
    let until = 0;
    try {
      until = Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      until = 0;
    }
    if (Date.now() < until) return;
    const t = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll + close on Escape while open
  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, dismiss]);

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
        body: JSON.stringify({ ...formData, locale: language }),
      });
      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedback(
          result.message ||
            (en
              ? 'Thank you! We have received your details and will contact you shortly.'
              : 'Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ trong thời gian sớm nhất.')
        );
        remember();
        setTimeout(() => setOpen(false), 2800);
      } else {
        setStatus('error');
        setFeedback(
          result.error || (en ? 'An error occurred. Please try again.' : 'Đã có lỗi xảy ra. Vui lòng thử lại sau.')
        );
      }
    } catch {
      setStatus('error');
      setFeedback(
        en
          ? 'Unable to send. Please check your connection and try again.'
          : 'Không thể gửi. Vui lòng kiểm tra kết nối và thử lại.'
      );
    }
  };

  const inputClass =
    'w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm text-biotechvet-dark focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-gray-300';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <div className="absolute inset-0 bg-biotechvet-dark/70 backdrop-blur-sm" />

          <motion.div
            className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <button
              type="button"
              onClick={dismiss}
              aria-label={en ? 'Close' : 'Đóng'}
              className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-biotechvet-dark transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 p-8 md:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-5">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-biotechvet-dark mb-3">
                  {en ? 'Thank you!' : 'Cảm ơn bạn!'}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed max-w-sm">{feedback}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6 pr-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-primary tracking-[2px] mb-1 italic">
                      {en ? 'Free consultation' : 'Tư vấn miễn phí'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-biotechvet-dark leading-tight">
                      {en ? 'Get advice from BIOTECH-VET' : 'Nhận tư vấn từ BIOTECH-VET'}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                  {en
                    ? 'Leave your details and our technical team will reach out to support you shortly.'
                    : 'Để lại thông tin, đội ngũ kỹ thuật của chúng tôi sẽ liên hệ và hỗ trợ bạn trong thời gian sớm nhất.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      name="fullName"
                      type="text"
                      placeholder={en ? 'Full name *' : 'Họ và tên *'}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={inputClass}
                      required
                    />
                    <input
                      name="phoneNumber"
                      type="tel"
                      placeholder={en ? 'Phone number *' : 'Số điện thoại *'}
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <input
                    name="emailAddress"
                    type="email"
                    placeholder={en ? 'Email address (optional)' : 'Địa chỉ email (không bắt buộc)'}
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <textarea
                    name="messageBox"
                    rows={3}
                    placeholder={en ? 'Your message (optional)' : 'Nội dung cần hỗ trợ (không bắt buộc)'}
                    value={formData.messageBox}
                    onChange={handleInputChange}
                    className={inputClass}
                  />

                  {status === 'error' && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                      <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500" />
                      <p className="text-sm font-semibold leading-relaxed">{feedback}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl text-xs uppercase tracking-[3px] transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> {en ? 'Sending...' : 'Đang gửi...'}
                      </>
                    ) : (
                      <>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />{' '}
                        {en ? 'Get free advice' : 'Nhận tư vấn ngay'}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={dismiss}
                    className="w-full text-center text-[11px] font-bold uppercase tracking-widest text-gray-300 hover:text-gray-500 transition-colors pt-1"
                  >
                    {en ? 'No thanks, maybe later' : 'Để sau, cảm ơn'}
                  </button>
                </form>
              </>
            )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
