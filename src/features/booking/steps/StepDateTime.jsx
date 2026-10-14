import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dateTimeSchema } from '../schemas/dateTimeSchema';
import Button from '../../shared/button/Button';
import ExitButton from '../../shared/button/ExitButton';

const TIME_SLOTS = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '09:00 PM'];

export default function StepDateTime({ onSubmit, isLoading , onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(dateTimeSchema),
  });

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
      <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-lg bg-[#65A30D] p-4 rounded-[35px] shadow-2xl">
        <div className="bg-white rounded-[28px] p-6 md:p-8 text-right">
          <ExitButton size="md" onClick={onClose}/>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            حدد <span className="text-lime-600">الموعد المناسب</span> للاجتماع
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اختر التاريخ *</label>
              <input
                type="date"
                {...register('date')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none"
              />
              {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">اختر الوقت المناسب *</label>
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((slot, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-lime-50">
                    <input type="radio" value={slot} {...register('time')} className="accent-lime-600" />
                    <span className="text-sm font-medium">{slot}</span>
                  </label>
                ))}
              </div>
              {errors.time && <span className="text-red-500 text-xs mt-1">{errors.time.message}</span>}
            </div>

            <Button               
              type="submit"
              disabled={isLoading}
              >
                {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز النهائي'}
            </Button>
          </form>
        </div>
      </div>
            <svg className='absolute top-[80.8%]' width="400" height="35" viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.88" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
      </svg>

      <svg className='absolute top-[82.1%]' width="330" height="35" viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.78" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
      </svg>
    </div>
  );
}