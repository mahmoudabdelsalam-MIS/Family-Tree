import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blogService';

// 1. هوك لجلب قائمة المدونات (مع دعم الفلاتر والصفحات)
export const useBlogs = (params) => {
  return useQuery({
    queryKey: ['blogs', params], // يتم إعادة الجلب تلقائياً لو الـ params تغيرت (مثل تغيير الفلتر)
    queryFn: () => blogService.getBlogs(params),
    keepPreviousData: true, // الحفاظ على البيانات القديمة أثناء تحميل الصفحة الجديدة بسلاسة
  });
};

// 2. هوك لجلب تفاصيل مقال واحد
export const useBlogDetail = (id) => {
  return useQuery({
    queryKey: ['blogDetail', id],
    queryFn: () => blogService.BlogDetail(id),
    enabled: !!id, // لن يتم تنفيذ الطلب إلا إذا كان الـ id موجوداً وصحيحاً
  });
};