'use client';
import React, { useState, useEffect } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'time';
  required?: boolean;
  options?: { label: string; value: string | number | boolean }[]; 
}

interface ReusableFormProps {
  title: string;
  fields: FormField[];
  initialData: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ReusableForm({ title, fields, initialData, onSubmit, onCancel }: ReusableFormProps) {
  const [formData, setFormData] = useState<any>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            
            {/* 1. เพิ่ม htmlFor ให้ตรงกับ id ของ Input */}
            {field.type !== 'checkbox' && (
              <label htmlFor={field.name} className="mb-1 font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            {field.type === 'textarea' ? (
              <textarea
                id={field.name} // <-- 2. เพิ่ม id ให้ตรงกับ htmlFor
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name} // <-- เพิ่ม id
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">-- กรุณาเลือก --</option>
                {field.options?.map((opt, idx) => (
                  <option key={idx} value={opt.value as string}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label htmlFor={field.name} className="flex items-center space-x-3 cursor-pointer mt-2">
                <input
                  id={field.name} // <-- เพิ่ม id
                  type="checkbox"
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </span>
              </label>
            ) : (
              <input
                id={field.name} // <-- เพิ่ม id
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            
          </div>
        ))}
        
        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold">
            ยกเลิก
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-sm">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
}