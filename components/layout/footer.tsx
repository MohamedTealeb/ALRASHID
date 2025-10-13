"use client";
import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useLanguage } from '@/contexts/LanguageContext';


export default function Footer() {
    const { translations, language } = useLanguage();
    return (
        <footer className="mt-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className={`flex flex-col md:flex-row gap-10 md:gap-16 ${language === 'ar' ? 'items-end' : 'items-start'}`}>
                    <div className="md:w-1/3 w-full">
                        <div className="flex items-center gap-3">
                            <img src={ASSETS_PATHS.logo} alt="logo" className="w-10 h-10 rounded"/>
                        </div>
                        <p className="mt-4 text-gray-600">
                            {translations.footer?.tagline}
                        </p>
                    </div>

                    <div className="md:w-1/3 w-full grid grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-3">Links</h4>
                            <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                <li><a className="text-gray-600 hover:text-[#6C4DF6]" href="#">{translations.footer?.links?.about}</a></li>
                                <li><a className="text-gray-600 hover:text-[#6C4DF6]" href="#">{translations.footer?.links?.courses}</a></li>
                                <li><a className="text-gray-600 hover:text-[#6C4DF6]" href="#">{translations.footer?.links?.contact}</a></li>
                                <li><a className="text-gray-600 hover:text-[#6C4DF6]" href="#">{translations.footer?.links?.privacy}</a></li>
                                <li><a className="text-gray-600 hover:text-[#6C4DF6]" href="#">{translations.footer?.links?.terms}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-3">{translations.footer?.contact?.title}</h4>
                            <ul className={`space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                                <li className="text-gray-600"><span className="font-medium">{translations.footer?.contact?.email}:</span> info@q-le.com</li>
                                <li className="text-gray-600"><span className="font-medium">{translations.footer?.contact?.phone}:</span> +20 100 000 0000</li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:w-1/3 w-full">
                        <div className={`flex ${language === 'ar' ? 'justify-end' : 'justify-start'} gap-4`}>
                            <a className="w-10 h-10 rounded-full bg-[#6C4DF6]/10 flex items-center justify-center text-[#6C4DF6] hover:bg-[#6C4DF6] hover:text-white transition-colors" href="#" aria-label="Facebook">
                                <FaFacebookF size={18} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-[#6C4DF6]/10 flex items-center justify-center text-[#6C4DF6] hover:bg-[#6C4DF6] hover:text-white transition-colors" href="#" aria-label="Twitter">
                                <FaTwitter size={18} />
                            </a>
                            <a className="w-10 h-10 rounded-full bg-[#6C4DF6]/10 flex items-center justify-center text-[#6C4DF6] hover:bg-[#6C4DF6] hover:text-white transition-colors" href="#" aria-label="Instagram">
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
                    <span>© {new Date().getFullYear()} {translations.footer?.brand}. {translations.footer?.copyright}</span>
                </div>
            </div>
        </footer>
    )
}