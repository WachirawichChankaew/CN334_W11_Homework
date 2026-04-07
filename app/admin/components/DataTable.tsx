import React from 'react';

// 1. อัปเดต Type ให้รองรับฟังก์ชัน render
export interface ColumnDef {
  header: string;
  accessor: string;
  render?: (item: any) => React.ReactNode; 
}

interface DataTableProps {
  columns: ColumnDef[];
  data: any[];
  // 2. ใส่เครื่องหมาย ? เพื่อบอกว่า "ไม่บังคับส่ง" (TypeScript จะได้ไม่ด่า)
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function DataTable({ columns, data, onEdit, onDelete }: DataTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-center p-6 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100">ไม่มีข้อมูล</div>;
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 font-semibold text-gray-600 text-sm whitespace-nowrap">
                {col.header}
              </th>
            ))}
            {/* สร้างคอลัมน์เปล่าๆ ทิ้งไว้ กรณีหน้าไหนมีการส่ง onEdit/onDelete มาแบบเก่า */}
            {(onEdit || onDelete) && <th className="py-3 px-4 font-semibold text-gray-600 text-sm text-right">จัดการ</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-3 px-4 text-sm text-gray-800 whitespace-nowrap">
                  {/* 🌟 พระเอกอยู่ตรงนี้: ถ้ามีการสร้างปุ่มแบบ render ให้โชว์ปุ่ม, ถ้าไม่มีให้โชว์ข้อมูลปกติ */}
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              
              {/* ปุ่มแบบเก่า (ถ้าหน้าไหนไม่ได้ส่งมา ส่วนนี้ก็จะหายไปเอง) */}
              {(onEdit || onDelete) && (
                <td className="py-3 px-4 text-sm text-right whitespace-nowrap space-x-3">
                  {onEdit && <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800 font-medium">แก้ไข</button>}
                  {onDelete && <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800 font-medium">ลบ</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}