import React, { createContext, useContext, useEffect, useState } from 'react';

const BreadcrumbContext = createContext({ title: '', setTitle: () => {} });

export function BreadcrumbProvider({ children }) {
  const [title, setTitle] = useState('');
  return (
    <BreadcrumbContext.Provider value={{ title, setTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

// الـ BreadCrumb بيقرا بيه العنوان
export const useBreadcrumbValue = () => useContext(BreadcrumbContext).title;

// أي صفحة تفاصيل بتناديه بالعنوان، وبيتمسح لما الصفحة تتقفل
export function useBreadcrumbTitle(title) {
  const { setTitle } = useContext(BreadcrumbContext);

  useEffect(() => {
    setTitle(title || '');
    return () => setTitle('');
  }, [title, setTitle]);
}