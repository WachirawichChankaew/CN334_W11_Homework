'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// เพิ่มฟังก์ชัน toggleSidebar เข้ามาใน Interface
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void; 
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'แดชบอร์ด', path: '/admin/dashboard' },
    { name: 'จัดการข้อมูล ROPA', path: '/admin/ropa'},
    { name: 'จัดการผู้ใช้งาน', path: '/admin/users' },
    { name: 'ตั้งค่าระบบ', path: '/admin/settings' },
  ];

  return (
    <aside 
      className={`bg-gray-900 h-screen fixed top-0 left-0 text-white flex flex-col shadow-xl z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* ส่วนหัว Sidebar (มีปุ่มพับเก็บอยู่ตรงนี้แล้ว!) */}
      <div className={`p-4 border-b border-gray-800 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        {/* โลโก้จะโชว์เฉพาะตอนเปิด */}
        <h2 className={`font-extrabold text-white bg-white-text  whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'text-2xl w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
          Admin
        </h2>
        
        {/* ปุ่มเปิด/ปิด Sidebar */}
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label={isOpen ? "พับเก็บเมนู" : "เปิดเมนู"}
          title={isOpen ? "พับเก็บเมนู" : "เปิดเมนู"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* เมนู */}
      <nav className="flex-1 mt-6 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname?.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  } ${isOpen ? 'justify-start space-x-3' : 'justify-center'}`}
                  title={!isOpen ? item.name : ''} 
                >
                  <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isOpen ? 'block opacity-100' : 'hidden opacity-0 w-0'}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ปุ่มออกจากระบบ */}
      <div className="p-4 border-t border-gray-800">
        <button className={`flex items-center p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors ${isOpen ? 'w-full justify-start space-x-3' : 'justify-center'}`} title="ออกจากระบบ">
          <span className={`font-medium whitespace-nowrap ${isOpen ? 'block' : 'hidden'}`}>
            ออกจากระบบ
          </span>
        </button>
      </div>
    </aside>
  );
}