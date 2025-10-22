'use client';

import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

function useCountUp(targetNumber: number, shouldStart: boolean, durationMs: number = 1500) {
    const [currentValue, setCurrentValue] = useState<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!shouldStart) return;

        function step(timestamp: number) {
            if (startTimeRef.current === null) startTimeRef.current = timestamp;
            const elapsed = timestamp - (startTimeRef.current || 0);
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const value = Math.floor(easedProgress * targetNumber);
            setCurrentValue(value);
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(step);
            } else {
                setCurrentValue(targetNumber);
            }
        }

        animationFrameRef.current = requestAnimationFrame(step);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
            startTimeRef.current = null;
        };
    }, [shouldStart, targetNumber, durationMs]);

    return currentValue;
}

function CountUpText({ value, start }: { value: string; start: boolean }) {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const numericPart = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : '';
    const animated = useCountUp(Math.round(numericPart), start);
    return <>{start ? `${animated}${suffix}` : value}</>;
}

export default function About() {
    const { translations } = useLanguage();

    const stats = [
        { number: "2000+", label: translations?.about?.stats?.students || "طالب" },
        { number: "100+", label: translations?.about?.stats?.teachers || "معلم" },
        { number: "20+", label: translations?.about?.stats?.years || "سنة خبرة" },
    ];

    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                {/* العنوان الرئيسي */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#B33791] font-cairo mb-6">
                        {translations?.about?.title || "من نحن"}
                    </h2>
                    <p className="text-xl text-gray-600 font-cairo max-w-4xl mx-auto leading-relaxed">
                        {translations?.about?.subtitle || "مدرسة الراشد الهندية - رحلة تعليمية متميزة"}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* النص الوصفي */}
                    <div>
                        <p className="text-lg text-gray-700 font-cairo leading-relaxed mb-8">
                            {translations?.about?.description || "نحن مؤسسة تعليمية رائدة تلتزم بتقديم تعليم متميز يجمع بين الأصالة والحداثة، ونهدف إلى تنمية قدرات الطلاب وتطوير مهاراتهم في بيئة تعليمية محفزة ومبتكرة."}
                        </p>
                        
                        {/* الرؤية والرسالة */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-[#B33791] font-cairo mb-4">
                                    {translations?.about?.vision?.title || "رؤيتنا"}
                                </h3>
                                <p className="text-gray-600 font-cairo leading-relaxed">
                                    {translations?.about?.vision?.description || "أن نكون المدرسة الرائدة في تقديم تعليم متميز يواكب متطلبات العصر ويحافظ على القيم الأصيلة."}
                                </p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-[#B33791] font-cairo mb-4">
                                    {translations?.about?.mission?.title || "رسالتنا"}
                                </h3>
                                <p className="text-gray-600 font-cairo leading-relaxed">
                                    {translations?.about?.mission?.description || "توفير بيئة تعليمية متكاملة تحفز على الإبداع والتميز، وتنمي الشخصية المتوازنة للطلاب."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* الصورة */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image 
                                src={ASSETS_PATHS.about} 
                                alt="مدرسة الراشد الهندية" 
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                            {/* طبقة تدرج */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#B33791]/20 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* زخارف */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
                    </div>
                </div>

                {/* القيم */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-[#B33791] font-cairo mb-12">
                        {translations?.about?.values?.title || "قيمنا"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {translations?.about?.values?.values?.map((value: {title: string, description: string}, index: number) => (
                            <div 
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group"
                            >
                                <div className="w-16 h-16 bg-[#B33791]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-8 h-8 bg-[#B33791] rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{index + 1}</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#B33791] font-cairo mb-4">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 font-cairo leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* الإحصائيات */}
                <StatsSection stats={stats} />
            </div>
        </section>
    );
}

function StatsSection({ stats }: { stats: { number: string; label: string }[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStart(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#B33791] rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold mb-2 font-cairo">
                            <CountUpText value={stat.number} start={start} />
                        </div>
                        <div className="text-lg font-cairo opacity-90">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

