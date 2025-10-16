'use client';

import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Video() {
    const { translations } = useLanguage();

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#B33791] font-cairo mb-6">
                        {translations?.video?.title || "شاهد مدرستنا"}
                    </h2>
                    <p className="text-xl text-gray-600 font-cairo max-w-3xl mx-auto">
                        {translations?.video?.subtitle || "تعرف على بيئة التعلم المتميزة والمرافق الحديثة في مدرسة الراشد الهندية"}
                    </p>
                </div>
                
                <div className="relative max-w-5xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        <video 
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-105" 
                            autoPlay 
                            controls  
                            controlsList="nodownload" 
                            muted  
                            loop
                            poster="/School-main-4K.jpg"
                        >
                            <source src={ASSETS_PATHS.video} type="video/mp4" />
                            متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                        
                        {/* طبقة تظليل خفيفة */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* أيقونة تشغيل مخصصة */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="w-20 h-20 bg-[#B33791]/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* معلومات إضافية تحت الفيديو */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center space-x-6 text-gray-600 font-cairo">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#B33791]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span>{translations?.video?.features?.highQuality || "جودة عالية"}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#B33791]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <span>{translations?.video?.features?.educationalContent || "محتوى تعليمي"}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#B33791]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                                </svg>
                                <span>{translations?.video?.features?.free || "مجاني"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
