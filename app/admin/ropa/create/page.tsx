'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '../../components/ReusableForm';
import { controllerFields, processorFields, initialControllerData, initialProcessorData } from '../constants';

export default function CreateRopaPage() {
  const router = useRouter();
  const [ropaType, setRopaType] = useState<'controller' | 'processor'>('controller');

  const handleSubmit = async (formData: any) => {
    const payload = { ...formData, ropa_type: ropaType };
    try {
      const res = await fetch('http://127.0.0.1:8000/ropa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push('/admin/ropa');
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-6 flex justify-center space-x-2">
        <button onClick={() => setRopaType('controller')} className={`px-4 py-2 rounded font-semibold ${ropaType === 'controller' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          ฟอร์ม Controller
        </button>
        <button onClick={() => setRopaType('processor')} className={`px-4 py-2 rounded font-semibold ${ropaType === 'processor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          ฟอร์ม Processor
        </button>
      </div>

      <ReusableForm
        title={`เพิ่มข้อมูล ROPA (${ropaType.toUpperCase()})`}
        fields={ropaType === 'controller' ? controllerFields : processorFields}
        initialData={ropaType === 'controller' ? initialControllerData : initialProcessorData}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/ropa')}
      />
    </div>
  );
}