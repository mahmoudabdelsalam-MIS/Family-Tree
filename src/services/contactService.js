import { axiosInstance } from './axiosInstance';

export const contactService = {
  // الخطوة 1: البيانات الشخصية (POST /contact/inquiries)
  createInquiry: async (data) => {
    const response = await axiosInstance.post('/contact/inquiries', {
      name: data.firstName,
      familyName: data.familyName,
      email: data.email,
      number: data.phone,
    });
    return response.data;
  },

  // الخطوة 2: فئة الخدمة فقط { serviceCategoryId } (PATCH .../step-2)
  updateInquiry: async (token, payload) => {
    const response = await axiosInstance.patch(`/contact/inquiries/${token}/step-2`, payload);
    return response.data;
  },

  // الخطوة 3: التاريخ والوقت { date, timeId } (PATCH .../step-3)
  completeInquiry: async (token, payload) => {
    const response = await axiosInstance.patch(`/contact/inquiries/${token}/step-3`, payload);
    return response.data;
  },

  // لما العميل يقفل المودال قبل ما يخلص (POST .../abandon)
  abandonInquiry: async (token, step) => {
    const response = await axiosInstance.post(`/contact/inquiries/${token}/abandon`, { step });
    return response.data;
  },
};