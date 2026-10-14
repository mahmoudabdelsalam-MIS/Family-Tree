import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { serviceTypeSchema, SERVICE_TYPES } from '../schemas/serviceTypeSchema';
import { X } from 'lucide-react';
import Button from '../../shared/button/Button';
import ExitButton from '../../shared/button/ExitButton'

export default function StepServiceType({ onSubmit, isLoading , onClose }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(serviceTypeSchema),
  });

  const selectedService = watch('serviceType');

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
      {/* الإطار الأخضر الخارجي المائل والتدرجات مثل الصورة تماماً */}
      <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-4xl bg-[#65A30D] p-4 md:p-6 rounded-[35px] shadow-2xl">
        <div className="bg-white rounded-[28px] p-6 md:p-10 relative overflow-hidden">
          
            <ExitButton size="md" onClick={onClose}/>

          <h2 className="text-center text-xl md:text-2xl font-extrabold text-gray-800 mb-2">
            اختر نوع <span className="text-lime-600 underline underline-offset-8">المنتج / الخدمة</span> المطلوبة
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col items-center">
            {/* خيارات بعمودين بنفس تنسيق الصور */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 w-full max-w-xl text-right mb-8">
              {SERVICE_TYPES.map((service, idx) => (
                <label
                  key={idx}
                  className="flex items-center justify-between cursor-pointer group py-1 text-gray-700 hover:text-lime-600 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base">{service}</span>
                  <input
                    type="radio"
                    value={service}
                    {...register('serviceType')}
                    className="w-5 h-5 accent-lime-600 cursor-pointer"
                  />
                </label>
              ))}
            </div>

            {errors.serviceType && (
              <span className="text-red-500 text-sm mb-4">{errors.serviceType.message}</span>
            )}

            <Button               
              type="submit"
              disabled={isLoading || !selectedService}
              >
                {isLoading ? 'جاري الحفظ...' : 'إرسال'}
            </Button>
          </form>
          
        </div>
        
      </div>
      <svg className='absolute top-[81%]' width="800" height="35" viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.88" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
      </svg>

      <svg className='absolute top-[83.8%]' width="720" height="35" viewBox="0 0 1040 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.78" d="M0 0H1039.9V0C1039.9 17.1444 1026 31.0427 1008.86 31.0427H31.0427C13.8982 31.0427 0 17.1444 0 0V0Z" fill="#589E08"/>
      </svg>

    </div>
  );
}