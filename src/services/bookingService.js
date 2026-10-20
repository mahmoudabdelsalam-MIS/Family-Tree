import { axiosInstance } from './axiosInstance';

export const bookingService = {
  // فئات الخدمات للخطوة 2 (data[].id هو اللي بيتبعت في serviceCategoryId)
  getServiceCategories: async () => {
    const response = await axiosInstance.get('/service-categories');
    return response.data;
  },

  // الأوقات المتاحة في يوم معين، التاريخ بصيغة Y-m-d (مثال: 2026-10-07)
  getTimes: async (date) => {
    const response = await axiosInstance.get(`/booking/dates/${date}/times`);
    return response.data;
  },
};