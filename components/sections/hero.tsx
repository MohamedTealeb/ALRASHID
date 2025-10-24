"use client";

import { ASSETS_PATHS } from './../constants/AssetsPaths';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Hero() {
  const { translations } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* صورة الخلفية */}
      <Image 
        src={ASSETS_PATHS.img_Background} 
        alt="Background" 
        fill
        className="object-cover"
        priority
      />

      {/* طبقة تظليل خفيفة بلون أساسي شفاف */}
      <div className="absolute inset-0 bg-main/30"></div>

      {/* زخارف لطيفة */}
      <div className="absolute top-12 left-12 w-16 h-16 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>

      {/* المحتوى */}
      <div className="relative z-10 text-center px-6 md:px-12 text-white drop-shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#B33791] font-cairo">
          {translations?.Hero.title || "مدرسة الراشد الهندية"}
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-gray-100 font-cairo">
          {translations?.Hero.subtitle || "نرحب بكم في رحلتنا التعليمية المتميزة حيث نغرس القيم والتميز الأكاديمي"}
        </p>
        <button className="bg-[#B33791] hover:bg-[#a02e80] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-105 font-cairo">
          {translations?.Hero.cta || "اكتشف المزيد"}
        </button>
      </div>

      {/* منحنى سفلي بسيط */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/90 rounded-t-[50%] backdrop-blur-sm"></div>
    </section>
  );
}
