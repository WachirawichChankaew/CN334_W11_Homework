import { FormField } from '../components/ReusableForm';

// ตัวเลือกมาตรฐานสำหรับคำถามประเภท ใช่/ไม่ใช่
const booleanOptions = [
  { label: 'ใช่ (True)', value: 'true' },
  { label: 'ไม่ใช่ (False)', value: 'false' }
];


// โครงสร้างฟอร์มสำหรับ Controller

export const controllerFields: FormField[] = [
  { name: 'sequence_no', label: 'ลำดับ', type: 'text', required: true },
  { name: 'controller_info', label: '1. ข้อมูลเกี่ยวกับผู้ควบคุมข้อมูลส่วนบุคคล', type: 'textarea', required: true },
  
  // Recorder Info
  { name: 'recorder_info_name', label: 'ชื่อผู้ลงบันทึก ROPA / DPO', type: 'text', required: true },
  { name: 'recorder_info_address', label: 'ที่อยู่ผู้ลงบันทึก', type: 'textarea' },
  { name: 'recorder_info_email', label: 'Email', type: 'text' },
  { name: 'recorder_info_phone', label: 'เบอร์โทร', type: 'text' },

  // Activity
  { name: 'activity_name', label: '2. กิจกรรมประมวลผล', type: 'text', required: true },
  { name: 'purpose', label: '3. วัตถุประสงค์ของการประมวลผล', type: 'textarea', required: true },
  { name: 'collected_personal_data', label: '4. ข้อมูลส่วนบุคคลที่จัดเก็บ', type: 'textarea', required: true },
  { name: 'data_subject_category', label: '5. หมวดหมู่ของข้อมูล', type: 'text' },
  { name: 'data_type', label: '6. ประเภทของข้อมูล (ทั่วไป/อ่อนไหว)', type: 'text' },
  { name: 'collection_format', label: '7. วิธีการได้มาซึ่งข้อมูล', type: 'text' },

  // Data Source
  { 
    name: 'data_source_is_direct_from_subject', 
    label: '8.1 จากเจ้าของข้อมูลโดยตรงหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { name: 'data_source_indirect_source_detail', label: '8.2 จากแหล่งอื่น (ระบุ)', type: 'textarea' },
  { name: 'legal_basis', label: '9. ฐานในการประมวลผล', type: 'text', required: true },

  // Minor Consent
  { name: 'minor_consent_under_10_years', label: '10.1 การขอความยินยอมผู้เยาว์ อายุไม่เกิน 10 ปี', type: 'textarea' },
  { name: 'minor_consent_between_10_to_20_years', label: '10.2 การขอความยินยอมผู้เยาว์ อายุ 10 - 20 ปี', type: 'textarea' },

  // Cross Border Transfer
  { 
    name: 'cross_border_transfer_is_transferred', 
    label: '11.1 มีการโอนข้อมูลไปต่างประเทศหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { 
    name: 'cross_border_transfer_is_intra_group', 
    label: '11.2 โอนไปกลุ่มบริษัทในเครือหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { name: 'cross_border_transfer_transfer_method', label: '11.3 วิธีการโอนข้อมูล', type: 'text' },
  { name: 'cross_border_transfer_destination_standard', label: '11.4 มาตรฐานการคุ้มครองข้อมูลปลายทาง', type: 'text' },
  { name: 'cross_border_transfer_section_28_exception', label: '11.5 ข้อยกเว้นตามมาตรา 28', type: 'textarea' },

  // Retention Policy
  { name: 'retention_policy_storage_format', label: '12.1 ประเภทของข้อมูลที่จัดเก็บ', type: 'text' },
  { name: 'retention_policy_storage_method', label: '12.2 วิธีการเก็บรักษาข้อมูล', type: 'text' },
  { name: 'retention_policy_retention_period', label: '12.3 ระยะเวลาการเก็บรักษา', type: 'text' },
  { name: 'retention_policy_access_rights_and_methods', label: '12.4 สิทธิและวิธีการเข้าถึงข้อมูล', type: 'textarea' },
  { name: 'retention_policy_destruction_method', label: '12.5 วิธีการลบหรือทำลาย', type: 'textarea' },

  // Other Details
  { name: 'disclosure_without_consent', label: '13. การเปิดเผยข้อมูลที่ได้รับยกเว้นไม่ต้องขอความยินยอม', type: 'textarea' },
  { name: 'dsar_rejection_record', label: '14. การปฎิเสธคำขอการใช้สิทธิ', type: 'textarea' },

  // Security Measures
  { name: 'security_measures_organizational_measure', label: '15.1 มาตรการเชิงองค์กร', type: 'textarea' },
  { name: 'security_measures_technical_measure', label: '15.2 มาตรการเชิงเทคนิค', type: 'textarea' },
  { name: 'security_measures_physical_measure', label: '15.3 มาตรการทางกายภาพ', type: 'textarea' },
  { name: 'security_measures_access_control', label: '15.4 การควบคุมการเข้าถึงข้อมูล', type: 'textarea' },
  { name: 'security_measures_user_responsibility', label: '15.5 หน้าที่ความรับผิดชอบของผู้ใช้งาน', type: 'textarea' },
  { name: 'security_measures_audit_trail', label: '15.6 มาตรการตรวจสอบย้อนหลัง', type: 'textarea' },
];

export const initialControllerData = {
  sequence_no: '', controller_info: '', recorder_info_name: '', recorder_info_address: '', recorder_info_email: '', recorder_info_phone: '',
  activity_name: '', purpose: '', collected_personal_data: '', data_subject_category: '', data_type: '', collection_format: '',
  data_source_is_direct_from_subject: '', data_source_indirect_source_detail: '', legal_basis: '', minor_consent_under_10_years: '',
  minor_consent_between_10_to_20_years: '', cross_border_transfer_is_transferred: '', cross_border_transfer_is_intra_group: '',
  cross_border_transfer_transfer_method: '', cross_border_transfer_destination_standard: '', cross_border_transfer_section_28_exception: '',
  retention_policy_storage_format: '', retention_policy_storage_method: '', retention_policy_retention_period: '',
  retention_policy_access_rights_and_methods: '', retention_policy_destruction_method: '', disclosure_without_consent: '',
  dsar_rejection_record: '', security_measures_organizational_measure: '', security_measures_technical_measure: '',
  security_measures_physical_measure: '', security_measures_access_control: '', security_measures_user_responsibility: '', security_measures_audit_trail: ''
};

// ==========================================
// 2. โครงสร้างฟอร์มสำหรับ Processor
// ==========================================
export const processorFields: FormField[] = [
  { name: 'sequence_no', label: 'ลำดับ', type: 'text', required: true },
  { name: 'processor_name', label: '1. ชื่อผู้ประมวลผลข้อมูลส่วนบุคคล', type: 'text', required: true },
  { name: 'controller_address', label: '2. ที่อยู่ผู้ควบคุมข้อมูลส่วนบุคคล', type: 'textarea', required: true },

  // Recorder Info
  { name: 'recorder_info_name', label: 'ชื่อผู้ลงบันทึก ROPA (ของฝั่ง Processor)', type: 'text', required: true },
  { name: 'recorder_info_address', label: 'ที่อยู่ผู้ลงบันทึก', type: 'textarea' },
  { name: 'recorder_info_email', label: 'Email', type: 'text' },
  { name: 'recorder_info_phone', label: 'เบอร์โทร', type: 'text' },

  // Activity
  { name: 'activity_name', label: '3. กิจกรรมประมวลผล', type: 'text', required: true },
  { name: 'purpose', label: '4. วัตถุประสงค์ของการประมวลผล', type: 'textarea', required: true },
  { name: 'collected_personal_data', label: '5. ข้อมูลส่วนบุคคลที่จัดเก็บ', type: 'textarea', required: true },
  { name: 'data_subject_category', label: '6. หมวดหมู่ของข้อมูล', type: 'text' },
  { name: 'data_type', label: '7. ประเภทของข้อมูล (ทั่วไป/อ่อนไหว)', type: 'text' },
  { name: 'collection_format', label: '8. วิธีการได้มาซึ่งข้อมูล', type: 'text' },

  // Data Source
  { 
    name: 'data_source_is_direct_from_controller', 
    label: '9.1 จากผู้ควบคุมข้อมูลโดยตรงหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { name: 'data_source_indirect_source_detail', label: '9.2 จากแหล่งอื่น (ระบุ)', type: 'textarea' },
  { name: 'legal_basis', label: '10. ฐานในการประมวลผล', type: 'text', required: true },

  // Cross Border Transfer
  { 
    name: 'cross_border_transfer_is_transferred', 
    label: '11.1 มีการโอนข้อมูลไปต่างประเทศหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { 
    name: 'cross_border_transfer_is_intra_group', 
    label: '11.2 โอนไปกลุ่มบริษัทในเครือหรือไม่?', 
    type: 'select', 
    options: booleanOptions 
  },
  { name: 'cross_border_transfer_transfer_method', label: '11.3 วิธีการโอนข้อมูล', type: 'text' },
  { name: 'cross_border_transfer_destination_standard', label: '11.4 มาตรฐานการคุ้มครองข้อมูลปลายทาง', type: 'text' },
  { name: 'cross_border_transfer_section_28_exception', label: '11.5 ข้อยกเว้นตามมาตรา 28', type: 'textarea' },

  // Retention Policy
  { name: 'retention_policy_storage_format', label: '12.1 ประเภทของข้อมูลที่จัดเก็บ', type: 'text' },
  { name: 'retention_policy_storage_method', label: '12.2 วิธีการเก็บรักษาข้อมูล', type: 'text' },
  { name: 'retention_policy_retention_period', label: '12.3 ระยะเวลาการเก็บรักษา', type: 'text' },
  { name: 'retention_policy_access_rights_and_methods', label: '12.4 สิทธิและวิธีการเข้าถึงข้อมูล', type: 'textarea' },
  { name: 'retention_policy_destruction_method', label: '12.5 วิธีการลบหรือทำลาย', type: 'textarea' },

  // Security Measures
  { name: 'security_measures_organizational_measure', label: '13.1 มาตรการเชิงองค์กร', type: 'textarea' },
  { name: 'security_measures_technical_measure', label: '13.2 มาตรการเชิงเทคนิค', type: 'textarea' },
  { name: 'security_measures_physical_measure', label: '13.3 มาตรการทางกายภาพ', type: 'textarea' },
  { name: 'security_measures_access_control', label: '13.4 การควบคุมการเข้าถึงข้อมูล', type: 'textarea' },
  { name: 'security_measures_user_responsibility', label: '13.5 หน้าที่ความรับผิดชอบของผู้ใช้งาน', type: 'textarea' },
  { name: 'security_measures_audit_trail', label: '13.6 มาตรการตรวจสอบย้อนหลัง', type: 'textarea' },
];

export const initialProcessorData = {
  sequence_no: '', processor_name: '', controller_address: '', recorder_info_name: '', recorder_info_address: '',
  recorder_info_email: '', recorder_info_phone: '', activity_name: '', purpose: '', collected_personal_data: '',
  data_subject_category: '', data_type: '', collection_format: '', data_source_is_direct_from_controller: '',
  data_source_indirect_source_detail: '', legal_basis: '', cross_border_transfer_is_transferred: '',
  cross_border_transfer_is_intra_group: '', cross_border_transfer_transfer_method: '', cross_border_transfer_destination_standard: '',
  cross_border_transfer_section_28_exception: '', retention_policy_storage_format: '', retention_policy_storage_method: '',
  retention_policy_retention_period: '', retention_policy_access_rights_and_methods: '', retention_policy_destruction_method: '',
  security_measures_organizational_measure: '', security_measures_technical_measure: '', security_measures_physical_measure: '',
  security_measures_access_control: '', security_measures_user_responsibility: '', security_measures_audit_trail: ''
};