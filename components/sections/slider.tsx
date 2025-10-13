"use client";

import { useState, useEffect } from "react";
import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Slider() {
  const { translations, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const images = [
    { src: ASSETS_PATHS.img_Slider1, alt: "img1" },
    { src: ASSETS_PATHS.img_Slider2, alt: "img2" },
    { src: ASSETS_PATHS.img_Slider3, alt: "img3" },
  ];

  const total = images.length;

  useEffect(() => {
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative w-full mt-16">
      <h2 className={`text-5xl font-extrabold mb-6 text-center text-cyan-600`}>
        {translations.slider?.title}
      </h2>
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-4xl h-[420px] overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 h-full"
        style={{
          transform: `translateX(${language === "ar" ? current * 100 : -current * 100}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="flex-none w-full h-full flex items-center justify-center bg-white">
            <img
              src={img.src}
              alt={img.alt}
              className="w-[80%] h-[90%] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group ${
          language === "ar" ? "right-4" : "left-4"
        }`}
      >
        <svg 
          className={`w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300 ${
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
        className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group ${
          language === "ar" ? "left-4" : "right-4"
        }`}
      >
        <svg 
          className={`w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-300 ${
            language === "ar" ? "rotate-180" : ""
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

        </div>
      </div>

    </div>
  );
}
