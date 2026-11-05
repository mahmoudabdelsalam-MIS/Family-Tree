import { useQuery } from '@tanstack/react-query';
import { aboutService } from '../services/aboutCardsService';

export const useAboutPage = () => {
  return useQuery({
    queryKey: ['aboutPageData'],
    queryFn: () => aboutService.getAboutPageData(),
    staleTime: 1000 * 60 * 10, // 10 دقائق
  });
};