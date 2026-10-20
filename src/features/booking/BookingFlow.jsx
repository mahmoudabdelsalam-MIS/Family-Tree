import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepServiceType from './steps/StepServiceType';
import StepDateTime from './steps/StepDateTime';
import { contactService } from '../../services/contactService';
import Button from '../shared/button/Button';

const getErrorMessage = (err) =>
  err?.response?.data?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى.';

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [inquiryToken, setInquiryToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // مرحلة 1: إرسال البيانات الشخصية والحصول على الـ token
  const handleStep1Submit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await contactService.createInquiry(data);
      // الـ token في res.data.token
      const token =
        res?.data?.inquiryToken ?? res?.data?.token ?? res?.inquiryToken ?? res?.token;

      if (!token) {
        console.error('مفيش token في الرد:', res);
        setErrorMessage('تعذر بدء الطلب، يرجى المحاولة لاحقاً.');
        return;
      }

      setInquiryToken(token);
      setCurrentStep(2);
    } catch (err) {
      console.error('خطأ في إرسال البيانات الشخصية:', err);
      setErrorMessage(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // مرحلة 2: فئة الخدمة فقط (PATCH step-2)
  const handleStep2Submit = async (data) => {
    if (!inquiryToken) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      await contactService.updateInquiry(inquiryToken, { serviceCategoryId: data.serviceType });
      setCurrentStep(3);
    } catch (err) {
      console.error('خطأ في تحديد نوع الخدمة:', err);
      setErrorMessage(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // مرحلة 3: التاريخ والوقت (PATCH step-3)
  const handleStep3Submit = async (data) => {
    if (!inquiryToken) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      await contactService.completeInquiry(inquiryToken, {
        date: data.date,
        timeId: data.timeId,
      });

      setIsCompleted(true);
      setCurrentStep(4);
    } catch (err) {
      console.error('خطأ في حفظ الموعد:', err);
      setErrorMessage(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // قفل المودال قبل الإكمال: نبلّغ السيرفر إن الطلب اتلغى ونرجع للبداية
  const handleClose = () => {
    const token = inquiryToken;
    const step = currentStep; // لازم يتحفظ قبل setCurrentStep(1)
    setCurrentStep(1);
    setInquiryToken(null);
    setErrorMessage('');

    if (token && !isCompleted) {
      contactService.abandonInquiry(token, step).catch((err) => {
        console.error('خطأ في إلغاء الطلب:', err);
      });
    }
  };

  return (
    <div className="w-full py-10 px-4">
      {/* رسالة الخطأ: فوق المودالات كلها */}
      {errorMessage &&
        createPortal(
          <div
            dir="rtl"
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-red-50 text-red-600 border border-red-200 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg"
          >
            {errorMessage}
          </div>,
          document.body
        )}

      {/* الخطوة الأولى تعرض دائمًا بالصفحة */}
      <StepPersonalInfo onSubmit={handleStep1Submit} isLoading={isLoading && currentStep === 1} />

      {/* الخطوة الثانية تظهر عبر مودال Portal */}
      {currentStep === 2 &&
        createPortal(
          <StepServiceType onClose={handleClose} onSubmit={handleStep2Submit} isLoading={isLoading} />,
          document.body
        )}

      {/* الخطوة الثالثة تظهر عبر مودال Portal */}
      {currentStep === 3 &&
        createPortal(
          <StepDateTime onClose={handleClose} onSubmit={handleStep3Submit} isLoading={isLoading} />,
          document.body
        )}

      {/* رسالة النجاح النهائية */}
      {isCompleted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm dir-rtl">
            <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
              <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">تم الحجز بنجاح!</h3>
              <p className="text-gray-600 mb-6">شكرًا لك، تم حفظ بياناتك وموعدك وسنتواصل معك قريباً.</p>
              <Button onClick={() => window.location.reload()}>
                اغلاق
              </Button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}