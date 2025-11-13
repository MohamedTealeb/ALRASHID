"use client";

import { useState } from 'react';
import { ASSETS_PATHS } from './../constants/AssetsPaths';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useGetBanner } from './../../hooks/use-banners';

export default function Hero() {
  const { translations } = useLanguage();
  const [showRegistrationModal, setShowRegistrationModal] = useState(true);
  const { data: banners } = useGetBanner();
  const bannerImagePath = banners?.data?.[0]?.bannerImage;
  const bannerImageSrc = bannerImagePath
    ? `${process.env.NEXT_PUBLIC_API_BASE ?? ''}${bannerImagePath}`
    : ASSETS_PATHS.registrationBanner;

  return (
    <>
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative  max-w-lg md:max-w-xl">
            <button
              type="button"
              onClick={() => setShowRegistrationModal(false)}
              className="absolute cursor-pointer z-50 -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-semibold text-gray-700 shadow-lg transition hover:bg-gray-100"
              aria-label="Close registration announcement"
            >
              ×
            </button>
            <Link href="/en/contact" className="block overflow-hidden rounded-3xl shadow-2xl transition hover:scale-[1.01]">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE ?? ''}${bannerImagePath}`}
                alt="Academic registration announcement"
                width={400}
                height={300}
                className="h-full w-full object-cover"
                priority
              />
            </Link>
          </div>
        </div>
      )}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
    
      {/* <Image 
        src={ASSETS_PATHS.img_Background} 
        alt="Background" 
        fill
        className="object-cover"
        priority
      /> */}

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
        <p className="text-lg md:text-2xl mb-10 text-gray-500 font-cairo">
          {translations?.Hero.subtitle || "نرحب بكم في رحلتنا التعليمية المتميزة حيث نغرس القيم والتميز الأكاديمي"}
        </p>
        <Link href="/en/contact">
        <button className="bg-[#B33791] cursor-pointer hover:bg-[#a02e80] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-105 font-cairo">
          {translations?.Hero.cta || "التسجيل الأكاديمي"}
        </button>
        </Link>
      </div>

      {/* منحنى سفلي بسيط */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/90 rounded-t-[50%] backdrop-blur-sm"></div>
    </section>
    </>
  );
}
