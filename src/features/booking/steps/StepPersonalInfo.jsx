import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '../schemas/personalInfoSchema';
import { DotGridPattern, WaveLinePattern } from '../shapes/BookingShapes';
import heroImg from '../../../assets/formBg.png'; // استبدلها بمسار الصورة لديك
import Button from '../../shared/button/Button';

export default function StepPersonalInfo({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(personalInfoSchema),
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-4xl bg-primary overflow-hidden px-6 md:px-10 py-6 md:py-6 shadow-2xl dir-rtl">
      {/* خلفيات وزخارف SVG */}
      <DotGridPattern className="absolute bottom-1/2 left-0 text-white pointer-events-none" />
      <WaveLinePattern className="absolute top-[-38%] left-1/4 w-full h-full pointer-events-none" />

      {/* الهيدر العلوي */}
      <div className='flex justify-center w-full'>
      <div className="flex flex-col items-end justify-center w-fit text-white mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-lime-100">احجز موعد اجتماع</span>
          <span className="w-2 h-2 rounded-full bg-white"></span>
        </div>
<h1 className="text-3xl md:text-5xl font-black tracking-normal scale-x-110 origin-right">
  لنبدأ العمل على مشروعك
</h1>
      </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* الفورم الابيض */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-right">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الاسم *</label>
              <input
                {...register('firstName')}
                placeholder="محمد"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right"
              />
              {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">اسم العائلة *</label>
              <input
                {...register('familyName')}
                placeholder="آل صالح"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right"
              />
              {errors.familyName && <span className="text-red-500 text-xs mt-1">{errors.familyName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="name@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right dir-ltr"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">رقم الجوال *</label>
              <input
                {...register('phone')}
                placeholder="05--------"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right dir-ltr"
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
            </div>

            <Button   
              type="submit"
              disabled={isLoading}
              >
              {isLoading ? 'جاري الإرسال...' : 'التالي'}
            </Button>
          </form>
        </div>

        {/* الصورة الجانبية */}
        <div className="hidden md:block lg:col-span-6 h-full min-h-[300px] rounded-2xl overflow-hidden pointer-events-none">
          <img src={heroImg} alt="Saudi Business" className="absolute w-full h-[150%]  object-contain rounded-2xl -top-50 left-[35%]" />
        </div>
      </div>
    </div>
  );
}