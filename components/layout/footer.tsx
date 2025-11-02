"use client";
import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { FaFacebookF, FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Footer() {
    const { translations } = useLanguage();
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    
    return (
        <footer className="bg-white border-t border-gray-200 text-gray-900">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* معلومات المدرسة */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image src={ASSETS_PATHS.logo} alt="مدرسة الراشد الهندية" width={48} height={48} className="rounded-lg"/>
                            <div>
                                <h3 className="text-xl font-bold font-cairo text-[#B33791]">
                                    {translations.footer?.brand || "مدرسة الراشد الهندية"}
                                </h3>
                            </div>
                        </div>
                        <p className="text-gray-600 font-cairo leading-relaxed mb-6">
                            {translations.footer?.tagline || "نحن نقدم تعليماً متميزاً يغرس القيم والتميز الأكاديمي للطلاب"}
                        </p>
                        
                        {/* وسائل التواصل الاجتماعي */}
                        <div className="flex gap-3 mb-4">
                            <a className="w-10 h-10 rounded-full bg-[#B33791]/20 flex items-center justify-center text-[#B33791] hover:bg-[#B33791] hover:text-white transition-all duration-300 transform hover:scale-110" target="_blank" href="https://www.facebook.com/share/1Jm9kc8odr/?mibextid=wwXIfr" aria-label="Facebook">
                                <FaFacebookF size={16} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-[#B33791]/20 flex items-center justify-center text-[#B33791] hover:bg-[#B33791] hover:text-white transition-all duration-300 transform hover:scale-110" target="_blank" href="https://www.instagram.com/alrashid.indian.school?igsh=MXE3bTg5OTVjNXl1bg%3D%3D&utm_source=qr" aria-label="Instagram">
                                <FaInstagram size={16} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-[#B33791]/20 flex items-center justify-center text-[#B33791] hover:bg-[#B33791] hover:text-white transition-all duration-300 transform hover:scale-110" target="_blank" href="https://t.me/alrashid99" aria-label="Telegram">
                                <FaTelegram size={16} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-[#B33791]/20 flex items-center justify-center text-[#B33791] hover:bg-[#B33791] hover:text-white transition-all duration-300 transform hover:scale-110" target="_blank" href="https://www.youtube.com" aria-label="YouTube">
                                <FaYoutube size={16} />
                            </a>
                        </div>
                        
                        {/* رابط Microsoft Teams */}
                        <div className="mt-4">
                            <h4 className="text-base font-bold font-cairo mb-3 text-[#B33791]">
                                {translations.footer?.teams?.title || "دخول منصة التيمز اضغط هنا"}
                            </h4>
                            <a 
                                className="w-40 h-20 rounded-full bg-[#6264A7] flex items-center justify-center text-white hover:bg-[#4B4D8C] transition-all duration-300 transform hover:scale-110 shadow-lg" 
                                target="_blank" 
                                href="https://teams.microsoft.com" 
                                aria-label="Microsoft Teams"
                            >
                                <Image 
                                    src='/microsoft-teams-svgrepo-com.svg' 
                                    alt={translations.footer?.teams?.alt || "Microsoft Teams"}
                                    width={70}
                                    height={32}
                                    className="object-contain"
                                />
                            </a>
                        </div>
                    </div>

                    {/* الروابط السريعة */}
                    <div>
                        <h4 className="text-lg font-bold font-cairo mb-6 text-[#B33791]">
                            {translations.footer?.links?.title || "روابط سريعة"}
                        </h4>
                        <ul className="space-y-3">
                            <li><a className="text-gray-600 hover:text-[#B33791] font-cairo transition-colors duration-300" href="#about">{translations.footer?.links?.about || "من نحن"}</a></li>
                            <li><a className="text-gray-600 hover:text-[#B33791] font-cairo transition-colors duration-300" href="/en/contact">{translations.footer?.links?.contact || "تواصل معنا"}</a></li>
                            <li><a className="text-gray-600 hover:text-[#B33791] font-cairo transition-colors duration-300" href="#academic">{translations.footer?.links?.academic || "الاكاديمية"}</a></li>
                            <li><a className="text-gray-600 hover:text-[#B33791] font-cairo transition-colors duration-300" href="#slider">{translations.footer?.links?.terms || "شروط الخدمة"}</a></li>
                        </ul>
                    </div>

                    {/* معلومات التواصل */}
                    <div>
                        <h4 className="text-lg font-bold font-cairo mb-6 text-[#B33791]">
                            {translations.footer?.contact?.title || "معلومات التواصل"}
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#B33791]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-[#B33791]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-600 font-cairo text-sm">
                                        <a href="mailto:info@alrashidschool.com">

                                        <span className="block text-[#B33791] font-semibold">{translations.footer?.contact?.email || "البريد الإلكتروني"}</span>
                                        info@alrashidschool.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#B33791]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-[#B33791]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-600 font-cairo text-sm">
                                        <span className="block text-[#B33791] font-semibold">{translations.footer?.contact?.phone || "الهاتف"}</span>
                                        { isRTL ? "96551735171+" : "+96551735171" }
                                    </p>
                                    <p className="text-gray-600 font-cairo text-sm">
                                        { isRTL ? "96555328677+" : "+96555328677" }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ساعات العمل */}
                    <div>
                        <h4 className="text-lg font-bold font-cairo mb-6 text-[#B33791]">
                            {translations.footer?.workingHours?.title || "ساعات العمل"}
                        </h4>
                        <div className="space-y-3 text-gray-600 font-cairo text-sm">
                            <div className="flex justify-between">
                                <span>{translations.footer?.workingHours?.weekdays || "الأحد - الخميس"}</span>
                                <span className="text-[#B33791]">{translations.footer?.workingHours?.weekdaysTime || "7:00 ص - 2:00 م"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{translations.footer?.workingHours?.weekend || "الجمعة - السبت"}</span>
                                <span className="text-[#B33791]">{translations.footer?.workingHours?.weekendTime || "مغلق"}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-300">
                                <p className="text-xs text-gray-500">
                                    {translations.footer?.workingHours?.note || "أوقات العمل قد تختلف في الإجازات الرسمية"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* الخط السفلي */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-600 font-cairo text-sm">
                            © {new Date().getFullYear()} {translations.footer?.brand || "مدرسة الراشد الهندية"}. {translations.footer?.copyright || "جميع الحقوق محفوظة."}
                        </p>
                       
                    </div>
                </div>
            </div>
        </footer>
    )
}