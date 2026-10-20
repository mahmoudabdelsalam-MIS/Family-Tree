import { useQuery } from '@tanstack/react-query';
import { homeService } from '../services/homeService';

// 1. هوك لجلب بيانات الصفحة الرئيسية المجمعة
export const useHomeData = () => {
  return useQuery({
    queryKey: ['homeData'],
    queryFn: homeService.getHomeData,
    staleTime: 1000 * 60 * 5, // الاحتفاظ بالبيانات كصالحة لمدة 5 دقائق لتجنب الطلبات المتكررة
  });
};

export const useServiceCategories = () => {
  return useQuery({
    queryKey: ['serviceCategories'],
    queryFn: homeService.getServiceCategories,
  });
};

export const useClientReviews = () => {
  return useQuery({
    queryKey: ['clientReviews'],
    queryFn: homeService.getClientReviews,
  });
};