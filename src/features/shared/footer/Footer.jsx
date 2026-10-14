import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaSnapchat, FaXTwitter, FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import logo from '../../../assets/logo.png';
import footerBg from '../../../assets/footerBg.jpg';
import IconCircle from '../Icons/IconCircle';

/* ---------- بيانات الفوتر  ---------- */

const browseLinks = [
  { title: 'من نحن', path: '/aboutUs' },
  { title: 'خدماتنا', path: '/services' },
  { title: 'عن العائلة', path: '/family' },
  { title: 'المدونة', path: '/blog' },
  { title: 'تواصل معنا', path: '/contactUs' },
];

const importantLinks = [
  { title: 'من نحن', path: '/aboutUs' },
  { title: 'خدماتنا', path: '/services' },
  { title: 'من نحن', path: '/aboutUs' },
  { title: 'عملائنا', path: '/clients' },
  { title: 'مميزات', path: '/features' },
];

const socials = [
  { label: 'فيسبوك', icon: <FaFacebookF />, href: 'https://facebook.com' },
  { label: 'سناب شات', icon: <FaSnapchat />, href: 'https://snapchat.com' },
  { label: 'إكس', icon: <FaXTwitter />, href: 'https://x.com' },
  { label: 'واتساب', icon: <FaWhatsapp />, href: 'https://wa.me/966500000000' },
  { label: 'إنستجرام', icon: <FaInstagram />, href: 'https://instagram.com' },
  { label: 'لينكدإن', icon: <FaLinkedinIn />, href: 'https://linkedin.com' },
];

const phones = ['+966 50X021234', '+966 20X021234'];

/* ---------- مكونات داخلية صغيرة ---------- */

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-8">{title}</h3>
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
  return (
    <footer dir="rtl" className="w-full">
      {/* القسم الرئيسي بخلفية صورة */}
      <div className="relative overflow-hidden w-full">
        <img 
          src={footerBg} 
          alt="Footer Background" 
          draggable="false"
          // الكلاسات السحرية: تموضع مطلق، ملء الأب، وتغطية بدون تشويه
          className="absolute inset-0 w-full h-full object-cover select-none z-0" 
        />
        
        {/* طبقة بيضاء شفافة لتوضيح النصوص دون إخفاء الخلفية (يمكنك تعديل bg-white/70 إلى bg-white/50 مثلاً لزيادة وضوح الصورة) */}
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
            <p className="text-sm leading-7 text-gray-800 font-lg font-bold">
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
              {/* العنوان */}
              <div className="flex items-start gap-3">
                <IconCircle icon={<MapPin size={20} />} size="lg" label="العنوان" />
                <span className="text-sm text-gray-800 leading-6 font-medium">
                  حي الحمراء طريق الإمام عبدالله بن سعود بن عبدالعزيز
                </span>
              </div>

              {/* الهواتف */}
              <div className="flex items-center gap-3">
                <IconCircle icon={<Phone size={18} />} size="lg" label="الهاتف" />
                <div dir="ltr" className="flex flex-wrap items-center gap-2 text-sm text-gray-800 font-medium">
                  {phones.map((phone, index) => (
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
                  <IconCircle key={item.label} {...item} />
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