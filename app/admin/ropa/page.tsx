'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DataTable from '../components/DataTable';

export default function RopaManagementPage() {
  const router = useRouter();
  const [ropas, setRopas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'controller' | 'processor'>('controller');
  
  // 🌟 State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // กำหนดให้แสดงหน้าละ 10 แถว

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRopa, setSelectedRopa] = useState<any | null>(null);

  useEffect(() => {
    fetchRopas();
  }, []);

  // เมื่อเปลี่ยน Tab หรือ ค้นหา ให้กลับไปเริ่มหน้า 1 ใหม่เสมอ
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const fetchRopas = async () => {
    try {
      const response = await fetch('http://localhost:8000/ropa');
      if (response.ok) {
        const data = await response.json();
        setRopas(data);
      }
    } catch (error) {
      console.error('Error fetching ROPAs:', error);
    }
  };

  const handleDelete = async (item: any) => {
    if (confirm(`ลบข้อมูลกิจกรรม: ${item.activity_name} ใช่หรือไม่?`)) {
      try {
        await fetch(`http://localhost:8000/ropa/${item.id}`, { method: 'DELETE' });
        fetchRopas();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  // --- Mapping สำหรับ Modal (เหมือนเดิม) ---
  const recorderMapping = [
    { label: 'ชื่อผู้ลงบันทึก ROPA / DPO', key: 'recorder_info_name' },
    { label: 'Email ผู้ติดต่อ', key: 'recorder_info_email' },
    { label: 'เบอร์โทรศัพท์', key: 'recorder_info_phone' },
    { label: 'ที่อยู่ผู้ลงบันทึก', key: 'recorder_info_address' },
    { label: 'ข้อมูลผู้ควบคุม (Controller Info)', key: 'controller_info' },
    { label: 'ชื่อผู้ประมวลผล (Processor Name)', key: 'processor_name' },
    { label: 'ที่อยู่ผู้ควบคุม (Controller Address)', key: 'controller_address' },
  ];

  const activityMapping = [
    { label: 'ลำดับ (Sequence No)', key: 'sequence_no' },
    { label: 'กิจกรรมประมวลผล', key: 'activity_name' },
    { label: 'วัตถุประสงค์การประมวลผล', key: 'purpose' },
    { label: 'ข้อมูลส่วนบุคคลที่จัดเก็บ', key: 'collected_personal_data' },
    { label: 'หมวดหมู่ของเจ้าของข้อมูล', key: 'data_subject_category' },
    { label: 'ประเภทของข้อมูล (ทั่วไป/อ่อนไหว)', key: 'data_type' },
    { label: 'วิธีการได้มาซึ่งข้อมูล', key: 'collection_format' },
    { label: 'ฐานในการประมวลผล (Legal Basis)', key: 'legal_basis' },
    { label: 'จากเจ้าของข้อมูลโดยตรงหรือไม่?', key: 'data_source_is_direct_from_subject' },
    { label: 'จากผู้ควบคุมข้อมูลโดยตรงหรือไม่?', key: 'data_source_is_direct_from_controller' },
    { label: 'จากแหล่งอื่น (ระบุรายละเอียด)', key: 'data_source_indirect_source_detail' },
    { label: 'ยินยอมผู้เยาว์ อายุไม่เกิน 10 ปี', key: 'minor_consent_under_10_years' },
    { label: 'ยินยอมผู้เยาว์ อายุ 10 - 20 ปี', key: 'minor_consent_between_10_to_20_years' },
    { label: 'มีการโอนไปต่างประเทศหรือไม่?', key: 'cross_border_transfer_is_transferred' },
    { label: 'โอนไปกลุ่มบริษัทในเครือหรือไม่?', key: 'cross_border_transfer_is_intra_group' },
    { label: 'วิธีการโอนข้อมูล', key: 'cross_border_transfer_transfer_method' },
    { label: 'มาตรฐานการคุ้มครองปลายทาง', key: 'cross_border_transfer_destination_standard' },
    { label: 'ข้อยกเว้นตามมาตรา 28', key: 'cross_border_transfer_section_28_exception' },
    { label: 'ประเภทของข้อมูลที่จัดเก็บ', key: 'retention_policy_storage_format' },
    { label: 'วิธีการเก็บรักษาข้อมูล', key: 'retention_policy_storage_method' },
    { label: 'ระยะเวลาการเก็บรักษา', key: 'retention_policy_retention_period' },
    { label: 'สิทธิและวิธีการเข้าถึงข้อมูล', key: 'retention_policy_access_rights_and_methods' },
    { label: 'วิธีการลบหรือทำลาย', key: 'retention_policy_destruction_method' },
    { label: 'การเปิดเผยที่ได้รับยกเว้นไม่ต้องขอความยินยอม', key: 'disclosure_without_consent' },
    { label: 'การปฎิเสธคำขอการใช้สิทธิ', key: 'dsar_rejection_record' },
    { label: 'มาตรการเชิงองค์กร', key: 'security_measures_organizational_measure' },
    { label: 'มาตรการเชิงเทคนิค', key: 'security_measures_technical_measure' },
    { label: 'มาตรการทางกายภาพ', key: 'security_measures_physical_measure' },
    { label: 'การควบคุมการเข้าถึงข้อมูล', key: 'security_measures_access_control' },
    { label: 'หน้าที่ความรับผิดชอบของผู้ใช้งาน', key: 'security_measures_user_responsibility' },
    { label: 'มาตรการตรวจสอบย้อนหลัง (Audit Trail)', key: 'security_measures_audit_trail' },
  ];

  const columns = [
    { header: 'ลำดับ', accessor: 'sequence_no' },
    { header: 'กิจกรรมประมวลผล', accessor: 'activity_name' },
    { header: 'ผู้ลงบันทึก', accessor: 'recorder_info_name' },
    { 
      header: 'การจัดการ', 
      accessor: 'id',
      render: (item: any) => (
        <div className="flex space-x-3">
          <button onClick={() => { setSelectedRopa(item); setIsModalOpen(true); }} className="text-blue-600 hover:underline">ดูรายละเอียด</button>
          <button onClick={() => router.push(`/admin/ropa/edit/${item.id}`)} className="text-yellow-600 hover:underline">แก้ไข</button>
          <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline">ลบ</button>
        </div>
      )
    }
  ];

  // ==============================================================
  // 🌟 Logic การกรองข้อมูลและแบ่งหน้า (Pagination Logic)
  // ==============================================================
  const allFilteredData = ropas.filter(r => {
    const matchSearch = r.activity_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        r.sequence_no?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTab = r.ropa_type === activeTab; 
    return matchSearch && matchTab;
  }).reverse(); // ข้อมูลใหม่ขึ้นก่อน

  // คำนวณหาจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(allFilteredData.length / itemsPerPage);

  // ตัดข้อมูลเพื่อแสดงเฉพาะหน้าที่เลือก (e.g. แถวที่ 1-10, 11-20)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFilteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">จัดการข้อมูล ROPA</h1>
        <Link href="/admin/ropa/create" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow-sm transition-colors">+ สร้าง ROPA ใหม่</Link>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('controller')} className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === 'controller' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>ผู้ควบคุมข้อมูล</button>
          <button onClick={() => setActiveTab('processor')} className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === 'processor' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>ผู้ประมวลผลข้อมูล</button>
        </div>
        <input type="text" placeholder="ค้นหากิจกรรมหรือลำดับ..." className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* ตารางแสดงข้อมูลเฉพาะ 10 รายการของหน้านั้นๆ */}
      <DataTable columns={columns} data={currentItems} />

      {/* ========================================= */}
      {/* 🌟 ส่วนควบคุม Pagination (เลขหน้า) */}
      {/* ========================================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={`px-4 py-2 rounded border ${currentPage === 1 ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            ก่อนหน้า
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded border transition-colors ${
                currentPage === index + 1 ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={`px-4 py-2 rounded border ${currentPage === totalPages ? 'text-gray-300 border-gray-100 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* Modal ดูรายละเอียด (เหมือนเดิม) */}
      {isModalOpen && selectedRopa && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-8 py-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">รายละเอียดข้อมูล ROPA</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 text-3xl font-light">&times;</button>
            </div>
            <div className="p-8 overflow-y-auto space-y-10">
              <section>
                <h3 className="text-lg font-bold text-blue-600 border-l-4 border-blue-600 pl-3 mb-4">1. รายละเอียดของผู้ลงบันทึก ROPA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-50/30 p-6 rounded-xl border border-blue-100">
                  {recorderMapping.map((f) => selectedRopa[f.key] && (
                    <div key={f.key}>
                      <label className="text-[10px] font-bold text-blue-500 uppercase">{f.label}</label>
                      <p className="text-gray-900 font-semibold">{selectedRopa[f.key]}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="text-lg font-bold text-green-600 border-l-4 border-green-600 pl-3 mb-4">2. รายละเอียดกิจกรรมและการประมวลผล</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {activityMapping.map((f) => selectedRopa[f.key] && (
                    <div key={f.key} className="border-b border-gray-100 pb-3 hover:border-green-200 transition-all">
                      <label className="text-xs font-bold text-gray-400 block mb-1">{f.label}</label>
                      <div className="text-gray-800 whitespace-pre-wrap font-medium">
                        {selectedRopa[f.key] === 'true' ? <span className="text-green-600">ใช่</span> : selectedRopa[f.key] === 'false' ? <span className="text-red-600">ไม่ใช่</span> : selectedRopa[f.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="px-8 py-5 border-t bg-gray-50 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-2 bg-gray-800 text-white rounded-lg hover:bg-black font-bold">ปิดหน้าต่าง</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}