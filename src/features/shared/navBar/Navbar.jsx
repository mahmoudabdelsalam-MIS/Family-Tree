import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {logo} from '../../../assets/assets'
import { Menu, X, ChevronDown } from 'lucide-react';
import { useServiceCategories } from '../../../hooks/useHome';

const navLinks = [
  { title: 'الرئيسية', path: '/' },
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

/* ---------- الناف بار الرئيسي ---------- */
export default function Navbar() {
  const { data: response, isLoading, error } = useServiceCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };
  
  const handleFilterSelect = (filterKey) => {
    setIsDropdownOpen(false);
    navigate(`/products?category=${filterKey}`);
  };

  // استخراج البيانات بأمان (حسب هيكلة الـ API الخاص بك سواء كانت مصفوفة مباشرة أو داخل .data)
  const categoriesList = Array.isArray(response) ? response : response?.data || [];

  return (
    <header dir="ltr" className="absolute fixed top-2 left-0 z-50 w-full px-3 md:px-8 pt-3">
      <nav className="bg-white max-w-[1320px] py-1.5 mx-auto shadow-sm rounded-xl">
        <div className="flex justify-between items-center px-6 py-2">
          
          {/* أدوات الهيدر (اللغة) - جهة اليسار */}
          {/* flex-1 بتخلي العمود ده والعمود اللي فيه اللوجو بنفس العرض فالروابط تفضل في النص بالظبط */}
          <div className="hidden lg:flex flex-1 items-center gap-3">
            <LanguageButton currentLang={lang} onToggle={toggleLanguage} />
            <span className="w-0.5 h-5 rounded-full bg-gray-300 mx-1" />
          </div>


          {/* روابط التنقل - المنتصف */}
          <div dir='rtl' className="hidden lg:flex items-center gap-6 lg:gap-8">
            
            {/* روابط البداية */}
            <NavLink
              to="/"
              end
              className={({ isActive }) => `
                relative text-base font-normal transition-colors duration-400
                after:absolute after:-bottom-2 after:right-0 after:h-1 after:rounded-full after:bg-[#68a300] after:transition-all
                ${isActive ? 'text-[#68a300] after:w-[60%]' : 'text-Navlink hover:text-[#68a300] after:w-0'}
              `}
            >
              الرئيسية
            </NavLink>

            {/* زر القائمة المنسدلة للخدمات والمنتجات مع الهوفر */}
            <div 
              className="relative py-2 group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <NavLink
                to='/products' 
                className={({ isActive }) =>`relative flex items-center gap-1 text-base font-normal text-Navlink group-hover:text-[#68a300] cursor-pointer duration-400 
                after:absolute after:-bottom-2 after:right-0 after:h-1 after:rounded-full after:bg-[#68a300] transition-all after:transition-all
                ${isActive ? 'text-[#68a300] font-normal after:w-[60%]' : 'text-Navlink hover:text-[#68a300] font-normal after:w-0'}`}
              >
                <span>الخدمات والمنتجات</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </NavLink>

              {/* القائمة المنسدلة */}
              {isDropdownOpen && categoriesList.length > 0 && (
                <div className="absolute top-full right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fadeIn p-1">
                  <div className="flex flex-col">
                    {categoriesList.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilterSelect(item.id || item.linkUrl)}
                        className="w-full text-right px-5 py-4 text-gray-700 hover:bg-[#589E0812] hover:rounded-xl hover:text-primary transition-all text-sm font-medium border-b border-gray-100 last:border-none cursor-pointer"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* باقي الروابط */}
            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative text-base duration-400
                  after:absolute after:-bottom-2 after:right-0 after:h-1 after:rounded-full after:bg-[#68a300] transition-all after:transition-all
                  ${isActive ? 'text-[#68a300] font-normal after:w-[60%]' : 'text-Navlink hover:text-[#68a300] font-normal after:w-0'}
                `}
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* اللوجو - جهة اليمين */}
          <div className="lg:flex-1 flex justify-end">
            <div className="w-28 h-auto shrink-0">
              <Link to="/">
                <img
                  src={logo}
                  alt="العائلة"
                  draggable="false"
                  className="w-full h-full object-contain select-none cursor-pointer"
                />
              </Link>
            </div>
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
            ${isMenuOpen ? 'max-h-[500px] opacity-100 py-4 border-t border-gray-100' : 'max-h-0 opacity-0 py-0'}`}
        >
          <div className="flex flex-col gap-1.5">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className="font-bold text-sm text-gray-700 hover:bg-gray-50 py-2.5 px-4 rounded-xl"
            >
              الرئيسية
            </NavLink>
            
            <NavLink
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="font-bold text-sm text-gray-700 hover:bg-gray-50 py-2.5 px-4 rounded-xl"
            >
              الخدمات والمنتجات
            </NavLink>

            {/* خيارات الخدمات الفرعية في الموبايل */}
            {/* <div className="pr-6 flex flex-col gap-1">
              {categoriesList.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleFilterSelect(item.id || item.linkUrl);
                  }}
                  className="text-right text-xs font-semibold text-gray-600 py-1.5 hover:text-[#589E08]"
                >
                   {item.title}
                </button>
              ))}
            </div> */}

            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="font-bold text-sm text-gray-700 hover:bg-gray-50 py-2.5 px-4 rounded-xl"
              >
                {link.title}
              </NavLink>
            ))}

            {/* أدوات الموبايل */}
            <div className="flex items-center justify-center pt-4 mt-2 border-t border-gray-100">
              <LanguageButton currentLang={lang} onToggle={toggleLanguage} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}