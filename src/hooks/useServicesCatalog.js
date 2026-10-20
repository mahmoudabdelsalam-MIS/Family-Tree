import { useQuery } from '@tanstack/react-query';
import { servicesCatalogService } from '../services/servicesCatalogService'; // عدل مسار الاستيراد حسب مكان الملف لديك

// 1. Hook لجلب كتالوج الخدمات (مع إمكانية الفلترة بـ categoryId)
export const useServicesCatalog = (categoryId) => {
  return useQuery({
    queryKey: ['servicesCatalog', categoryId],
    queryFn: () => servicesCatalogService.getServicesCatalog(categoryId),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

// 2. Hook لجلب قائمة الخدمات العامة
export const useServicesList = () => {
  return useQuery({
    queryKey: ['servicesList'],
    queryFn: servicesCatalogService.getServicesList,
  });
};

// 3. Hook لجلب تفاصيل خدمة معينة بناءً على الـ serviceId
export const useServiceDetail = (serviceId) => {
  return useQuery({
    queryKey: ['serviceDetail', serviceId],
    queryFn: () => servicesCatalogService.getServiceDetail(serviceId),
    enabled: !!serviceId, // لن يتم إرسال الطلب إلا إذا وُجد serviceId صالح
  });
};