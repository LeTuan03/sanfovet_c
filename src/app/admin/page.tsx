"use client";

import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import {
  ShoppingOutlined,
  AppstoreOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { products, articles, categories, jobs } from '@/lib/data';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-50 pb-8">
         <div className="flex flex-col">
            <h1 className="text-3xl font-black text-sanfovet-dark uppercase italic tracking-tighter">Tổng quan Hệ thống</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[0.7rem] mt-1 space-x-2 flex items-center">
               <span>Quản trị Sanfovet</span>
               <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
               <span className="text-primary tracking-normal font-black">Phiên bản 2.0.1</span>
            </p>
         </div>
         <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <div className="flex flex-col text-right">
               <span className="text-[0.65rem] font-black text-gray-400 uppercase">Trạng thái</span>
               <span className="text-green-600 font-black flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Hoạt động tốt</span>
            </div>
         </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all text-2xl">
                  <ShoppingOutlined />
               </div>
               <Statistic
                  title={<span className="font-bold text-gray-400 uppercase text-[0.7rem] tracking-widest">Sản phẩm</span>}
                  value={products.length}
               />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all text-2xl">
                  <AppstoreOutlined />
               </div>
               <Statistic
                  title={<span className="font-bold text-gray-400 uppercase text-[0.7rem] tracking-widest">Danh mục</span>}
                  value={categories.length}
               />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all text-2xl">
                  <ReadOutlined />
               </div>
               <Statistic
                  title={<span className="font-bold text-gray-400 uppercase text-[0.7rem] tracking-widest">Bài viết</span>}
                  value={articles.length}
               />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-all text-2xl">
                  <UsergroupAddOutlined />
               </div>
               <Statistic
                  title={<span className="font-bold text-gray-400 uppercase text-[0.7rem] tracking-widest">Tuyển dụng</span>}
                  value={jobs.length}
               />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
         <Col xs={24} lg={16}>
            <Card variant="borderless" className="shadow-lg rounded-[40px] p-4">
               <h3 className="text-xl font-black mb-8 border-b border-gray-50 pb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-base">
                     <ArrowUpOutlined />
                  </div>
                  Hoạt động gần nhất
               </h3>
               <div className="space-y-6">
                  {articles.slice(0, 4).map((a) => (
                    <div key={a.id} className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden shrink-0">
                          <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:opacity-20" />
                       </div>
                       <div className="flex flex-col flex-1">
                          <span className="font-bold text-gray-800 line-clamp-1 text-sm group-hover:text-primary transition-colors">{a.title}</span>
                          <span className="text-[0.65rem] text-gray-400 font-bold uppercase mt-1 tracking-widest">{a.publishDate} • {a.category}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
         </Col>
         <Col xs={24} lg={8}>
            <Card variant="borderless" className="shadow-lg rounded-[40px] bg-primary text-white p-4">
               <h3 className="text-xl font-black mb-6 text-white uppercase tracking-wider">Hỗ trợ kỹ thuật</h3>
               <p className="text-white/70 text-sm font-medium leading-relaxed mb-8 italic opacity-80">"Hệ thống quản trị được tối ưu giúp bạn vận hành website mượt mà nhất. Nếu cần trợ giúp hãy liên hệ kỹ thuật viên."</p>
               <div className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                     <div className="text-[0.6rem] font-black uppercase text-white/50 tracking-widest mb-1">Kỹ thuật viên</div>
                     <div className="font-bold">Team Phát triển Hệ thống</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                     <div className="text-[0.6rem] font-black uppercase text-white/50 tracking-widest mb-1">Email</div>
                     <div className="font-bold text-xs">support@sanfovet.com.vn</div>
                  </div>
               </div>
            </Card>
         </Col>
      </Row>
    </div>
  );
}
