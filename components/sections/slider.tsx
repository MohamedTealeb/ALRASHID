"use client";

import { useState, useEffect } from "react";
import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Slider() {
  const { translations, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const images = [
    { src: ASSETS_PATHS.img_Slider1, alt: "img1" },
    { src: ASSETS_PATHS.img_Slider2, alt: "img2" },
    { src: ASSETS_PATHS.img_Slider3, alt: "img3" },
  ];

  const total = images.length;
  const autoSlideInterval = 4000; // 4 ثوان

  useEffect(() => {
    setMounted(true); 
  }, []);

  // Auto-slide functionality with progress indicator
  useEffect(() => {
    if (!mounted || !isAutoPlaying) {
      setProgress(0);
      return;
    }

    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / autoSlideInterval) * 100;
      setProgress(progressPercent);

      if (progressPercent >= 100) {
        setCurrent((prev) => (prev + 1) % total);
        startTime = Date.now();
        setProgress(0);
      }
    }, 50); // Update progress every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [mounted, isAutoPlaying, total, autoSlideInterval, current]);

  if (!mounted) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section id="slider" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#B33791] font-cairo mb-6">
            {translations?.slider?.title || "الأنشطة"}
          </h2>
          <p className="text-xl text-gray-600 font-cairo max-w-3xl mx-auto">
            {translations?.slider?.subtitle || "اكتشف الأنشطة المتنوعة والبرامج التعليمية المتميزة في مدرستنا"}
          </p>
        </div>
        
        <div className="relative w-full max-w-6xl mx-auto">
          <div 
            className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{
                transform: `translateX(${language === "ar" ? current * 100 : -current * 100}%)`,
              }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="flex-none w-full h-full relative group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* طبقة تظليل مع تأثير fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* معلومات الصورة */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                    <h3 className="text-2xl font-bold font-cairo mb-2">
                      {(translations?.slider?.[`slide${idx + 1}Alt` as keyof typeof translations.slider] as string) || `النشاط ${idx + 1}`}
                    </h3>
                    <p className="text-gray-200 font-cairo">
                      {translations?.slider?.slideDescription || "اكتشف المزيد من الأنشطة المتميزة في مدرستنا"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار التنقل */}
            <button
              onClick={prevSlide}
              className={`absolute top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-[#B33791]/90 backdrop-blur-sm shadow-lg hover:bg-[#B33791] hover:shadow-xl transition-all duration-300 group ${
                language === "ar" ? "right-6" : "left-6"
              }`}
            >
              <svg 
                className={`w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300 ${
                  language === "ar" ? "rotate-180" : ""
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className={`absolute top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-[#B33791]/90 backdrop-blur-sm shadow-lg hover:bg-[#B33791] hover:shadow-xl transition-all duration-300 group ${
                language === "ar" ? "left-6" : "right-6"
              }`}
            >
              <svg 
                className={`w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300 ${
                  language === "ar" ? "rotate-180" : ""
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* زر التحكم في Auto-slide */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group"
              title={isAutoPlaying ? (translations?.slider?.controls?.pauseAutoPlay || "إيقاف التشغيل التلقائي") : (translations?.slider?.controls?.startAutoPlay || "تشغيل تلقائي")}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* مؤشرات الصفحات مع مؤشر التقدم */}
          <div className="flex justify-center mt-8 space-x-3">
            {images.map((_, idx) => (
              <div key={idx} className="relative">
                <button
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === idx 
                      ? 'bg-[#B33791] scale-125' 
                      : 'bg-gray-300 hover:bg-[#B33791]/50'
                  }`}
                />
                {/* مؤشر التقدم */}
                {current === idx && isAutoPlaying && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#B33791] rounded-full transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
