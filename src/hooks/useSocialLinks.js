import { useQuery } from '@tanstack/react-query';
import { socialLinksService } from '../services/socialLinksService';

export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['socialLinksData'],
    queryFn: () => socialLinksService.getSocialLinksData(),
    staleTime: 1000 * 60 * 10, 
  });
};