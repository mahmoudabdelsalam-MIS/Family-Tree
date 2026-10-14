import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = "شجرة العائلة";

// خريطة المسارات ومسميات الصفحات
const pageTitles = {
  "/": "الرئيسية",
  "/podcasts": "البودكاست",
  "/podcasts/:id": "تفاصيل البودكاست",
  "/about": "من نحن",
  "/contact": "تواصل معنا",
};

export function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    // البحث عن الاسم المناسب للمسار الحالية
    let pageTitle = pageTitles[pathname];

    // لو المسار فيه ID زي /podcasts/123
    if (!pageTitle) {
      if (pathname.startsWith('/podcasts/')) {
        pageTitle = "تفاصيل البودكاست";
      } else {
        pageTitle = "صفحة غير معروفة";
      }
    }

    // تحديث عنوان الصفحة تلقائياً
    document.title = `${SITE_NAME} - ${pageTitle}`;
  }, [location]);
}