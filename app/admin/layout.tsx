'use client';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ฟังก์ชันสำหรับสลับสถานะเปิด/ปิด
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800">
      
      {/* ส่งทั้งสถานะ และฟังก์ชันไปให้ Sidebar ใช้งาน */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* ส่วนเนื้อหาหลัก โล่งๆ สะอาดๆ ไม่มีปุ่มเมนูขวางแล้ว */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </main>

    </div>
  );
}