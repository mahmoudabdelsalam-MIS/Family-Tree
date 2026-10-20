import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../services/bookingService';

// أوقات يوم معين (الخطوة 3): مبيشتغلش غير لما التاريخ يتحدد
export const useBookingTimes = (date) => {
  return useQuery({
    queryKey: ['bookingTimes', date],
    queryFn: () => bookingService.getTimes(date),
    enabled: !!date,
    retry: false, // يوم من غير مواعيد ممكن يرجع خطأ، منعيدش المحاولة
    staleTime: 60 * 1000,
  });
};