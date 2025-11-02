'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCapIcon } from "lucide-react";

// مكونات الأيقونات SVG
const EarlyYearsIcon = () => (
  <svg className="w-16 h-16 text-[#B33791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const PrimarySchoolIcon = () => (
  <svg className="w-16 h-16 text-[#B33791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const SecondarySchoolIcon = () => (
  <svg className="w-16 h-16 text-[#B33791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <circle cx="12" cy="16" r="2"/>
  </svg>
);


export default function AcademicSections() {
    const { translations } = useLanguage();
    
    const sections = [
        {
            icon: <EarlyYearsIcon />,
            title: translations?.academic?.sections?.earlyYears?.title || "المرحلة المبكرة",
            description: translations?.academic?.sections?.earlyYears?.description 
        },
        {
            icon: <PrimarySchoolIcon />,
            title: translations?.academic?.sections?.primarySchool?.title || "المدرسة الابتدائية",
            description: translations?.academic?.sections?.primarySchool?.description 
        },
        {
            icon: <SecondarySchoolIcon />,
            title: translations?.academic?.sections?.secondarySchool?.title || "المدرسة الثانوية",
            description: translations?.academic?.sections?.secondarySchool?.description 
        },
        {
            icon: <GraduationCapIcon className="w-16 h-16 text-[#B33791]" />,
            title: translations?.academic?.sections?.IGCSE?.title || "I G C S E",
            description: translations?.academic?.sections?.IGCSE?.description 
        },
    ];
    
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#B33791] font-cairo mb-6">
                        {translations?.academic?.sections?.mainTitle || "أقسامنا الأكاديمية"}
                    </h2>
                    <p className="text-xl text-gray-600 font-cairo max-w-3xl mx-auto">
                        {translations?.academic?.sections?.mainSubtitle || "نقدم تعليماً شاملاً ومتطوراً لجميع المراحل العمرية مع مراعاة الاحتياجات الخاصة"}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sections.map((section, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
                        >
                            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#B33791] font-cairo mb-4">
                                {section.title}
                            </h3>
                            <p className="text-gray-600 font-cairo leading-relaxed">
                                {section.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
