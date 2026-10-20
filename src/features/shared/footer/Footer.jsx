import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaSnapchat, FaXTwitter, FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import {logo , footerBg} from '../../../assets/assets'
import IconCircle from '../Icons/IconCircle';
import { useContactPage } from '../../../hooks/useContactPage';

/* ---------- بيانات الفوتر  ---------- */

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

const socials = [
  { label: 'فيسبوك', icon: <FaFacebookF />, href: 'https://facebook.com' },
  { label: 'سناب شات', icon: <FaSnapchat />, href: 'https://snapchat.com' },
  { label: 'إكس', icon: <FaXTwitter />, href: 'https://x.com' },
  { label: 'واتساب', icon: <FaWhatsapp />, href: 'https://wa.me/966500000000' },
  { label: 'إنستجرام', icon: <FaInstagram />, href: 'https://instagram.com' },
  { label: 'لينكدإن', icon: <FaLinkedinIn />, href: 'https://linkedin.com' },
];

// القيم الافتراضية: بتتعرض لو الـ API مرجّعش الداتا (أو رجّعها null)
const phones = ['+966 50X021234', '+966 20X021234'];
const DEFAULT_ADDRESS = 'حي الحمراء طريق الإمام عبدالله بن سعود بن عبدالعزيز';

// بيقبل بس لينكات http/https حقيقية
const getSafeUrl = (value) =>
  typeof value === 'string' && /^https?:\/\//i.test(value.trim()) ? value.trim() : null;

// "966530976737" -> "+966530976737" (أرقام بس)
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
  const { data: response } = useContactPage('ar');

  // قنوات التواصل من الـ API (نفس داتا صفحة تواصل معنا، ومتخزنة في الكاش)
  const channels = Array.isArray(response?.data?.channels) ? response.data.channels : [];
  const findChannel = (type) => channels.find((c) => c?.type === type) || {};
  const whatsapp = findChannel('whatsapp');
  const location = findChannel('location');

  // الهاتف: رقم الواتساب من الـ API، وإلا الأرقام الافتراضية
  const apiPhone = normalizePhone(whatsapp.phone);
  const footerPhones = apiPhone ? [apiPhone] : phones;

  // لينك الواتساب: actionUrl، وإلا wa.me برقم الهاتف
  const whatsappUrl =
    getSafeUrl(whatsapp.actionUrl) || (apiPhone ? `https://wa.me/${apiPhone.slice(1)}` : null);

  // العنوان: لو الـ API بعت نص (subtitle أو title) نعرضه، وإلا العنوان الافتراضي
  const addressText = location.subtitle || location.title || DEFAULT_ADDRESS;
  const mapUrl = getSafeUrl(location.actionUrl);

  // السوشيال: بنبدّل لينك الواتساب بس، والباقي زي ما هو
  const footerSocials = socials.map((item) =>
    item.label === 'واتساب' && whatsappUrl ? { ...item, href: whatsappUrl } : item
  );

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
          {/* اللوجو والوصف */}
          <div className="flex flex-col gap-5 max-w-sm">
            <Link to="/" className="w-40">
              <img
                src={logo}
                alt="Logo"
                draggable="false"
                className="w-full h-full object-contain select-none"
              />
            </Link>
            <p className=" leading-7 text-gray-800 text-sm font-semibold">
              هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن
              التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.
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
              {/* العنوان (بيفتح الخريطة لو الـ API بعت لينك الموقع) */}
              <div className="flex items-start gap-3">
                <IconCircle icon={<MapPin size={16} />} size="sm" label="العنوان" />
                {mapUrl ? (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-800 leading-6 font-medium hover:text-primary transition-colors"
                  >
                    {addressText}
                  </a>
                ) : (
                  <span className="text-xs text-gray-800 leading-6 font-medium">
                    {addressText}
                  </span>
                )}
              </div>

              {/* الهواتف */}
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
                {footerSocials.map((item) => (
                  <IconCircle key={item.label} {...item} size='sm'/>
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