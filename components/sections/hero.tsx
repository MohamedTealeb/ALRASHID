"use client";

import { ASSETS_PATHS } from './../constants/AssetsPaths';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { translations, language } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img 
        src={ASSETS_PATHS.img_Background} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {translations?.Hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {translations?.Hero.subtitle}
        </p>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
          {translations?.Hero.cta}
        </button>
      </div>
    </div>
  );
}