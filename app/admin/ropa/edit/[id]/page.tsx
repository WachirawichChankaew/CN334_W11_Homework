'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReusableForm from '../../../components/ReusableForm';
import { controllerFields, processorFields } from '../../constants';

export default function EditRopaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  const [initialData, setInitialData] = useState<any>(null);
  const [ropaType, setRopaType] = useState<'controller' | 'processor'>('controller');

  useEffect(() => {
    const fetchSingleRopa = async () => {
      try {
        const res = await fetch(`http://localhost:8000/ropa/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
          setRopaType(data.ropa_type || 'controller'); // เช็คว่าเป็นฟอร์มประเภทไหน
        }
      } catch (error) {
        console.error('Fetch single error:', error);
      }
    };
    if (id) fetchSingleRopa();
  }, [id]);

  const handleUpdate = async (formData: any) => {
    try {
      const res = await fetch(`http://localhost:8000/ropa/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) router.push('/admin/ropa');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!initialData) return <div className="text-center mt-10">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <ReusableForm
        title={`แก้ไขข้อมูล ROPA (${ropaType.toUpperCase()})`}
        fields={ropaType === 'controller' ? controllerFields : processorFields}
        initialData={initialData}
        onSubmit={handleUpdate}
        onCancel={() => router.push('/admin/ropa')}
      />
    </div>
  );
}