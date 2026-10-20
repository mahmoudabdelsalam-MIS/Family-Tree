import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '../schemas/personalInfoSchema';
import { DotGridPattern, WaveLinePattern } from '../shapes/BookingShapes';
import {formBg} from '../../../assets/assets'
import Button from '../../shared/button/Button';
import SectionTitle from '../../shared/headers/SectionTitle';

export default function StepPersonalInfo({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(personalInfoSchema),
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl md:rounded-[64px] bg-primary overflow-hidden px-4 sm:px-6 md:px-10 py-6 shadow-2xl dir-rtl">
      {/* خلفيات وزخارف SVG */}
      <DotGridPattern className="absolute bottom-1/2 left-0 text-white pointer-events-none" />
      <WaveLinePattern className="absolute top-[-46%] sm:top-[-45%] lg:top-[-40%] right-0 w-[70%] sm:w-[65%] lg:w-[60%] h-full pointer-events-none" />

      {/* الهيدر العلوي */}
      <div className='flex justify-start w-full ml-0 sm:ml-24'>
        <div className="relative z-10 mb-8 text-white!">
          <SectionTitle
            subtitle="احجز موعد اجتماع" 
            title=" لنبدأ العمل علي مشروعك" 
            light={true}
            className='gap-5'
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* الفورم الابيض */}
        <div className="lg:col-span-6 font-form bg-white rounded-3xl px-6 md:px-8 py-8 md:py-12 shadow-lg w-full max-w-[450px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-right">
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1"> * الاسم</label>
              <input
                {...register('firstName')}
                placeholder="محمد"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right"
              />
              {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">* اسم العائلة</label>
              <input
                {...register('familyName')}
                placeholder="آل صالح"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right"
              />
              {errors.familyName && <span className="text-red-500 text-xs mt-1">{errors.familyName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1">* البريد الإلكتروني</label>
              <input
                {...register('email')}
                type="email"
                placeholder="name@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-lime-500 focus:outline-none text-right dir-ltr"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-700 mb-1"> * رقم الجوال</label>
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
        <div className="hidden lg:block lg:col-span-6 h-full min-h-[300px] rounded-2xl overflow-hidden pointer-events-none">
          <img src={formBg} alt="Saudi Business" className="absolute w-full h-[150%] object-contain rounded-2xl -top-50 left-[35%]" />
        </div>
      </div>
    </div>
  );
}