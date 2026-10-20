import { useQuery } from '@tanstack/react-query';
import { contactService } from '../services/contactPageService';

export const useContactPage = () => {
  return useQuery({
    queryKey: ['contactPage'],
    queryFn: () => contactService.getContactPageData(),
    staleTime: 1000 * 60 * 10, 
  });
};