import { useQuery } from '@tanstack/react-query';
import { aboutCompanyService } from '../services/FooterDataService.js';

export const useAboutCompany = () => {
  return useQuery({
    queryKey: ['aboutCompanyData'],
    queryFn: () => aboutCompanyService.getAboutCompanyData(),
    staleTime: 1000 * 60 * 10, // 10 دقائق تخزين مؤقت
  });
};