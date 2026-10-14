import * as Yup from 'yup';

export const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('الاسم مطلوب'),
  familyName: Yup.string().required('اسم العائلة مطلوب'),
  email: Yup.string().email('البريد الإلكتروني غير صحيح').required('البريد الإلكتروني مطلوب'),
  phone: Yup.string().required('رقم الجوال مطلوب'),
});