import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { Menu, X, ShoppingBag, Moon, Sun } from 'lucide-react';

const navLinks = [
  { title: 'الرئيسية', path: '/' },
  { title: 'الخدمات والمنتجات', path: '/products' },
  { title: 'المدونة', path: '/blog' },
  { title: 'عن الموقع؟', path: '/aboutUs' },
  { title: 'تواصل معنا', path: '/contactUs' },
];

/* ---------- زر اللغة (تبديل بين العربي والإنجليزي) ---------- */
function LanguageButton({ currentLang, onToggle }) {
  const isAr = currentLang === 'ar';
  
  return (
    <button
      onClick={onToggle}
      aria-label="تغيير اللغة"
      className="w-8 h-8 rounded-full overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer shrink-0"
    >
      <img
        src={isAr ? "https://flagcdn.com/w80/sa.png" : "https://flagcdn.com/w80/gb.png"}
        alt={isAr ? "العربية" : "English"}
        className="w-full h-full object-cover"
        draggable="false"
      />
    </button>
  );
}

/* ---------- زر الثيم ---------- */
function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      dir="ltr"
      onClick={onToggle}
      aria-label="تغيير الثيم"
      className={`relative w-20 h-8 rounded-full overflow-hidden transition-colors duration-300 cursor-pointer shrink-0
        ${isDark ? 'bg-[#0b2a4a]' : 'bg-sky-300'}`}
    >
      {isDark && (
        <>
          <span className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full" />
          <span className="absolute top-4 left-6 w-0.5 h-0.5 bg-white rounded-full" />
          <span className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full" />
          <span className="absolute top-5 left-13 w-0.5 h-0.5 bg-white rounded-full" />
        </>
      )}
      <span
        className={`absolute top-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
          ${isDark ? 'left-[calc(100%-1.85rem)] bg-gray-300 text-gray-600' : 'left-0.5 bg-yellow-300 text-yellow-600'}`}
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  );
}

/* ---------- زر السلة الخضراء ---------- */
function CartButton({ count = 0 }) {
  return (
    <Link
      to="/cart"
      aria-label="السلة"
      className="relative w-9 h-9 rounded-full bg-[#68a300] text-white flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
    >
      <ShoppingBag size={18} />
      <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
        {count}
      </span>
    </Link>
  );
}

/* ---------- الناف بار الرئيسي ---------- */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en'); // 'ar' أو 'en'
  const cartCount = 0;

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <header dir="ltr" className="absolute fixed top-0 left-0 z-50 w-full px-3 md:px-8 pt-3">
      <nav className="bg-white shadow-sm rounded-2xl lg:rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center px-6 py-2.5">
          
          {/* أدوات الهيدر (السلة، الثيم، اللغة، الفاصل) - جهة اليسار */}
          <div className="hidden lg:flex items-center gap-3">
            <CartButton count={cartCount} />
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <LanguageButton currentLang={lang} onToggle={toggleLanguage} />
            <span className="w-px h-5 bg-gray-300 mx-1" />
          </div>

          {/* روابط التنقل - المنتصف */}
          <div dir='rtl' className="hidden lg:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `
                  relative pb-1 text-md font-bold transition-colors duration-400
                  after:absolute after:bottom-0 after:right-0 after:h-0.5 after:bg-[#68a300] after:transition-all
                  ${isActive
                    ? 'text-[#68a300] after:w-full'
                    : 'text-gray-700 hover:text-[#68a300] after:w-0'}
                `}
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* اللوجو - جهة اليمين */}
          <div className="w-28 h-auto shrink-0">
            <Link to="/">
              <img
                src={logo} // أضف مسار اللوجو الخاص بك هنا
                alt="العائلة"
                draggable="false"
                className="w-full h-full object-contain select-none cursor-pointer"
              />
            </Link>
          </div>

          {/* زر قائمة الموبايل */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden text-gray-800 p-1 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* قائمة الموبايل */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out px-6
            ${isMenuOpen ? 'max-h-96 opacity-100 py-4 border-t border-gray-100' : 'max-h-0 opacity-0 py-0'}`}
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  font-bold text-sm transition-colors duration-200 py-2.5 px-4 rounded-xl
                  ${isActive ? 'bg-[#68a300]/10 text-[#68a300]' : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {link.title}
              </NavLink>
            ))}

            {/* أدوات الموبايل (السلة، الثيم، اللغة) مرتبة نفس الهيدر الأصلي */}
            <div className="flex items-center justify-around pt-4 mt-2 border-t border-gray-100">
              <CartButton count={cartCount} />
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <LanguageButton currentLang={lang} onToggle={toggleLanguage} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}