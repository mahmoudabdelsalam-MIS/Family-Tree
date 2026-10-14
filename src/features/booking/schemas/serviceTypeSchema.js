import * as Yup from 'yup';

export const SERVICE_TYPES = [
  'تطبيق تواصل',
  'تطبيق صندوق العائلة',
  'إنشاء المواقع الالكترونية للعائلة',
  'تصميم الهوية العائلية',
  'تصميم الهوية العائلية',
  'تصميم المشجرات',
  'إنشاء المواقع الالكترونية للعائلة',
  'تصميم المشجرات',
  'تصميم المشجرات',
];

export const serviceTypeSchema = Yup.object().shape({
  serviceType: Yup.string().required('يرجى اختيار نوع الخدمة المطلوبة'),
});