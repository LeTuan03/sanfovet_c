"use client";

import React from 'react';
import { Card, Col, Row, Statistic, Badge, Button } from 'antd';
import {
  ShoppingOutlined,
  AppstoreOutlined,
  ReadOutlined,
  UsergroupAddOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { products, articles, categories, jobs } from '@/lib/data';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Sản phẩm',
      value: products.length,
      icon: <ShoppingOutlined />,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      shadow: 'shadow-blue-200',
    },
    {
      title: 'Danh mục',
      value: categories.length,
      icon: <AppstoreOutlined />,
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      shadow: 'shadow-emerald-200',
    },
    {
      title: 'Tin tức & Bài viết',
      value: articles.length,
      icon: <ReadOutlined />,
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      shadow: 'shadow-orange-200',
    },
    {
      title: 'Tuyển dụng',
      value: jobs.length,
      icon: <UsergroupAddOutlined />,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      shadow: 'shadow-purple-200',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <AdminPageHeader 
        title="Quản trị Hệ thống"
        breadcrumbItems={[{ title: 'Admin' }, { title: 'Tổng quan' }]}
        extra={
          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col text-right">
               <span className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">Trạng thái</span>
               <span className="text-green-600 text-xs font-black flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                 ONLINE
               </span>
            </div>
          </div>
        }
      />

      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="borderless" className="shadow-lg hover:shadow-xl transition-all rounded-3xl overflow-hidden group border border-gray-50/50">
                <div className="flex items-center gap-5 p-2">
                   <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                   </div>
                   <div className="flex-1">
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{stat.title}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-sanfovet-dark tracking-tighter">
                          {stat.value}
                        </span>
                        <span className="text-[10px] font-bold text-green-500">+12%</span>
                      </div>
                   </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]}>
         <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card variant="borderless" className="shadow-lg rounded-[32px] overflow-hidden border border-gray-50">
                 <div className="p-6">
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-50">
                       <h3 className="text-xl font-black flex items-center gap-3 italic">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-base">
                             <RocketOutlined />
                          </div>
                          Cập nhật mới nhất
                       </h3>
                       <Button type="text" className="text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5">Xem tất cả</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {articles.slice(0, 4).map((a, i) => (
                         <div key={a.id} className="flex items-center gap-5 group cursor-pointer p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                               <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col flex-1">
                               <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 opacity-80">{a.category}</span>
                               <span className="font-bold text-sanfovet-dark line-clamp-1 text-sm group-hover:text-primary transition-colors mb-1">{a.title}</span>
                               <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1.5">
                                 <ClockCircleOutlined /> {a.publishDate}
                               </span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </Card>
            </motion.div>
         </Col>
         <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="h-full"
            >
              <Card variant="borderless" className="shadow-xl rounded-[32px] bg-gradient-to-br from-sanfovet-dark to-primary text-white h-full relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                 <div className="relative z-1">
                    <h3 className="text-xl font-black mb-6 text-white uppercase tracking-[0.1em] italic">Trung tâm Hỗ trợ</h3>
                    <p className="text-white/70 text-sm font-medium leading-relaxed mb-10 italic opacity-90 border-l-2 border-white/20 pl-4">
                      Hệ thống quản trị được tối ưu giúp bạn vận hành website chuyên nghiệp. Cần hỗ trợ kỹ thuật?
                    </p>
                    <div className="space-y-4">
                       <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                          <div className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Kỹ thuật viên</div>
                          <div className="font-bold text-sm">Team Dev Sanfovet</div>
                       </div>
                       <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
                          <div className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-1">Kênh liên hệ 24/7</div>
                          <div className="font-bold text-sm tracking-tight italic">support@sanfovet.com.vn</div>
                       </div>
                    </div>
                    
                    <div className="mt-12 p-4 bg-primary-dark/30 rounded-2xl text-center border border-white/5">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Phiên bản Hệ thống 2.5.0</span>
                    </div>
                 </div>
              </Card>
            </motion.div>
         </Col>
      </Row>
    </div>
  );
}
