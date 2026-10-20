import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dateTimeSchema } from '../schemas/dateTimeSchema';
import Button from '../../shared/button/Button';
import ExitButton from '../../shared/button/ExitButton';
import Skeleton from '../../shared/skeleton/Skeleton';
import { useBookingTimes } from '../../../hooks/useBooking';

// "13:00" أو "13:00:00" -> "01:00 PM" (الـ API بيرجع 24 ساعة والعرض بس AM/PM)
const formatTime = (value) => {
  if (!value) return '';
  const [h, m] = value.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${String(m || 0).padStart(2, '0')} ${suffix}`;
};

// تاريخ النهارده بصيغة Y-m-d بتوقيت الجهاز (عشان min في input التاريخ)
const getToday = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function StepDateTime({ onSubmit, isLoading, onClose }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(dateTimeSchema),
  });

  // قيمة input من نوع date بتبقى دايماً Y-m-d (مثال 2026-10-07)
  const selectedDate = watch('date');

  const { data: response, isLoading: isTimesLoading, isError: isTimesError } = useBookingTimes(selectedDate);
  const times = response?.data || [];

  // لما التاريخ يتغير، نمسح الوقت المختار لأنه كان بتاع يوم تاني
  useEffect(() => {
    setValue('timeId', '');
  }, [selectedDate, setValue]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg bg-[#65A30D] p-4 rounded-[35px] shadow-2xl">
        <div className="bg-white rounded-[28px] p-6 md:p-8 text-right">
          <ExitButton size="md" onClick={onClose} />
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            حدد <span className="text-lime-600">الموعد المناسب</span> للاجتماع
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">* اختر التاريخ</label>
              <input
                type="date"
                min={getToday()}
                {...register('date')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-center md:text-right"
              />
              {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">* اختر الوقت المناسب</label>

              {/* مساحة الأوقات: ليها حد أدنى للارتفاع عشان المودال ماتتنطش */}
              <div className="min-h-[120px]">
                {!selectedDate ? (
                  <p className="text-gray-400 text-sm text-center py-8">.اختر التاريخ أولاً لعرض الأوقات المتاحة</p>
                ) : isTimesLoading ? (
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }, (_, i) => (
                      <Skeleton key={i} rounded="rounded-xl" className="h-[50px] w-full" />
                    ))}
                  </div>
                ) : isTimesError || times.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">.لا توجد مواعيد متاحة في هذا اليوم، يرجى اختيار يوم آخر</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {times.map((slot) => (
                      <label key={slot.id} className="flex justify-end items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-lime-50 transition-colors">
                        <span dir="ltr" className="text-sm font-medium">
                          {formatTime(slot.fromTime)}{slot.toTime ? ` - ${formatTime(slot.toTime)}` : ''}
                        </span>
                        <input
                          type="radio"
                          value={slot.id} // ده اللي بيتبعت كـ timeId
                          {...register('timeId')}
                          className="accent-lime-600 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {errors.timeId && <span className="text-red-500 text-xs mt-1">{errors.timeId.message}</span>}
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز النهائي'}
            </Button>
          </form>
        </div>

        <svg className='absolute bottom-[-15px] md:bottom-[-12px] left-1/2 -translate-x-1/2 w-[110%] md:w-[400px] h-auto pointer-events-none' viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path opacity="0.88" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
        </svg>
        <svg className='absolute bottom-[-30px] md:bottom-[-22px] left-1/2 -translate-x-1/2 w-[105%] md:w-[330px] h-auto pointer-events-none' viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path opacity="0.78" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
        </svg>
      </div>
    </div>
  );
}