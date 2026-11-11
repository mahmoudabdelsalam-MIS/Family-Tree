import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaSnapchat, FaXTwitter, FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { logo, footerBg } from '../../../assets/assets';
import IconCircle from '../Icons/IconCircle';
import { useSocialLinks } from '../../../hooks/useSocialLinks'; 
import { useAboutCompany } from '../../../hooks/useFooterData';

/* ---------- بيانات الفوتر ---------- */

const browseLinks = [
  { title: 'من نحن', path: '/aboutUs' },
  { title: 'خدماتنا', path: '/products' },
  { title: 'عن العائلة', path: '/aboutUs' },
  { title: 'المدونة', path: '/blog' },
  { title: 'تواصل معنا', path: '/contactUs' },
];

const importantLinks = [
  { title: 'الرئيسية', path: '/' },
  { title: 'خدماتنا', path: '/products' },
  { title: 'المدونة', path: '/blog' },
  { title: 'من نحن', path: '/aboutUs' },
  { title: 'تواصل معنا', path: '/contactUs' },
];

// القيم الافتراضية الاحتياطية
const DEFAULT_DESCRIPTION = 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.';
const DEFAULT_ADDRESS = 'حي الحمراء طريق الإمام عبدالله بن سعود بن عبدالعزيز';
const phones = ['+966 50X021234'];

// بيقبل بس لينكات http/https حقيقية
const getSafeUrl = (value) =>
  typeof value === 'string' && /^https?:\/\//i.test(value.trim()) ? value.trim() : null;

// تطبيع رقم الهاتف للأرقام فقط
const normalizePhone = (value) => {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits ? `+${digits}` : null;
};

/* ---------- مكونات داخلية صغيرة ---------- */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-base font-extrabold text-gray-900 mb-8">{title}</h3>
      {children}
    </div>
  );
}

function FooterLinks({ links }) {
  return (
    <ul className="flex flex-col gap-5">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            className="text-gray-700 hover:text-primary font-semibold transition-colors duration-200"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ---------- الفوتر ---------- */

export default function Footer() {
  const { data: socialResponse } = useSocialLinks();
  const { data: aboutCompanyResponse } = useAboutCompany(); // جلب بيانات عن الشركة

  // استخراج البيانات
  const socialLinksData = socialResponse?.socialLinks || {};
  const aboutCompanyData = aboutCompanyResponse?.data || {};

  // الوصف القادم من الـ API أو الافتراضي
  const footerDescription = aboutCompanyData.description || DEFAULT_DESCRIPTION;

  // الهاتف (من الـ aboutCompany أو الـ fallback)
  const apiPhone = normalizePhone(aboutCompanyData.whatsappNumber);
  const footerPhones = apiPhone ? [apiPhone] : phones;
  const whatsappUrl = socialLinksData.whatsapp ? getSafeUrl(socialLinksData.whatsapp) : (apiPhone ? `https://wa.me/${apiPhone.slice(1)}` : null);

  // العنوان (من الـ title القادم من about-company أو الافتراضي)
  const addressText = aboutCompanyData.title || DEFAULT_ADDRESS;

  // السوشيال ميديا
  const socials = [
    { label: 'فيسبوك', icon: <FaFacebookF />, href: getSafeUrl(socialLinksData.facebook) },
    { label: 'سناب شات', icon: <FaSnapchat />, href: getSafeUrl(socialLinksData.snapchat) },
    { label: 'إكس', icon: <FaXTwitter />, href: getSafeUrl(socialLinksData.twitter) },
    { label: 'واتساب', icon: <FaWhatsapp />, href: whatsappUrl },
    { label: 'إنستجرام', icon: <FaInstagram />, href: getSafeUrl(socialLinksData.instagram) },
    { label: 'لينكدإن', icon: <FaLinkedinIn />, href: getSafeUrl(socialLinksData.linkedIn) },
  ].filter((item) => item.href);

  return (
    <footer dir="rtl" className="font-primary w-full">
      {/* القسم الرئيسي بخلفية صورة */}
      <div className="relative overflow-hidden w-full">
        <img
          src={footerBg}
          alt="Footer Background"
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover select-none z-0"
        />

        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
          {/* اللوجو والوصف (مربوط بـ description القادم من about-company) */}
          <div className="flex flex-col gap-5 max-w-sm">
            <Link to="/" className="w-40">
              <img
                src={logo}
                alt="Logo"
                draggable="false"
                className="w-full h-full object-contain select-none"
              />
            </Link>
            <p className="leading-7 text-gray-800 text-sm font-semibold">
              {footerDescription}
            </p>
          </div>

          <FooterColumn title="يمكنك تصفح">
            <FooterLinks links={browseLinks} />
          </FooterColumn>

          <FooterColumn title="روابط هامة">
            <FooterLinks links={importantLinks} />
          </FooterColumn>

          <FooterColumn title="اتصل بنا">
            <div className="flex flex-col gap-5">
              {/* العنوان (مربوط بـ title القادم من about-company) */}
              <div className="flex items-start gap-3">
                <IconCircle icon={<MapPin size={16} />} size="sm" label="العنوان" />
                <span className="text-xs text-gray-800 leading-6 font-medium">
                  {addressText}
                </span>
              </div>

              {/* الهواتف (مربوط بـ whatsappNumber القادم من about-company) */}
              <div className="flex items-center gap-3">
                <IconCircle icon={<Phone size={16} />} size="sm" label="الهاتف" />
                <div dir="ltr" className="flex flex-wrap items-center gap-2 text-xs text-gray-800 font-medium">
                  {footerPhones.map((phone, index) => (
                    <React.Fragment key={phone}>
                      {index > 0 && <span className="text-gray-400">|</span>}
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                        {phone}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* السوشيال */}
              <div className="flex items-center flex-wrap gap-3 pt-2">
                <span className="text-sm font-bold text-gray-800 ml-1">تابعنا :</span>
                {socials.map((item) => (
                  <IconCircle key={item.label} {...item} size='sm' />
                ))}
              </div>
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* الشريط السفلي */}
      <div className="bg-gray-100/90 border-t border-gray-200/60 py-5 text-center text-sm font-semibold text-gray-700 px-4">
        تم التصميم والتطوير بواسطة - شركة عكس للبرمجيات والتسويق
      </div>
    </footer>
  );
}