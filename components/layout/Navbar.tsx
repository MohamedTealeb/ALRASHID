"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { ASSETS_PATHS } from "../constants/AssetsPaths";
import { gsap } from "gsap";

// Animated Link Component
const AnimatedLink = ({ href, children, onClick, className = "" }: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const underlineRef = useRef<HTMLDivElement>(null);

  const animateUnderline = (direction: 'in' | 'out') => {
    if (!underlineRef.current) return;
    
    if (direction === 'in') {
      gsap.fromTo(underlineRef.current, 
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(underlineRef.current, 
        { scaleX: 0, duration: 0.2, ease: "power2.in" }
      );
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-gray-700 hover:text-main transition font-medium relative ${className}`}
      onMouseEnter={() => animateUnderline('in')}
      onMouseLeave={() => animateUnderline('out')}
    >
      {children}
      <div 
        ref={underlineRef}
        className="absolute bottom-0 left-0 w-full h-0.5 bg-main transform scale-x-0"
      />
    </Link>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, translations, toggleLanguage } = useLanguage();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and School Name */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <img src={ASSETS_PATHS.logo} className="object-contain h-16 w-16" alt="Logo" />
            <div className={`font-sans ${language === "ar" ? "text-right" : "text-left"}`}>
              <div className={`text-lg font-semibold text-gray-800 ${language === "ar" ? "font-bold" : ""}`}>
                {translations?.navbar.brand}
              </div>
              <div className="text-sm font-medium text-gray-600 uppercase">
                {translations?.navbar.brandEn}
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex items-center space-x-6 text-gray-700 font-sans ${
            language === "ar" ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          {language === "ar" ? (
            <>
              <AnimatedLink href="#slider">
                {translations?.navbar.activities}
              </AnimatedLink>
              <AnimatedLink href="#academic">
                {translations?.navbar.academics}
              </AnimatedLink>
              <AnimatedLink href="#about">
                {translations?.navbar.about}
              </AnimatedLink>
              <Link href="/" className="text-main font-medium border-b-2 border-main pb-1">
                {translations?.navbar.home}
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="text-main font-medium border-b-2 border-main pb-1">
                {translations?.navbar.home}
              </Link>
              <AnimatedLink href="#about">
                {translations?.navbar.about}
              </AnimatedLink>
              <AnimatedLink href="#academic">
                {translations?.navbar.academics}
              </AnimatedLink>
              <AnimatedLink href="#slider">
                {translations?.navbar.activities}
              </AnimatedLink>
            </>
          )}
        </nav>

        {/* Login Button and Language */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href={language === "ar" ? "/ar/auth/login" : "/auth/login"}>
            <Button
              variant="outline"
              className="text-sm border-[#B33791] text-[#B33791] hover:bg-[#B33791] hover:text-white font-cairo"
            >
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-sm border-gray-700 text-gray-700 hover:bg-main/10 hover:border-main hover:text-main font-sans"
            onClick={toggleLanguage}
          >
            {language === "en" ? "AR" : "EN"}
          </Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={language === "ar" ? "right" : "left"}
              className="w-64"
            >
              <SheetHeader>
                <SheetTitle className="text-main font-sans">
                    {translations?.navbar.brand}
                </SheetTitle>
                <SheetDescription className="text-gray-600 font-sans">
                    {translations?.navbar.brandEn}
                </SheetDescription>
              </SheetHeader>
              <nav
                className={`mt-6 flex flex-col space-y-4 text-gray-700 font-sans ${
                  language === "ar" ? "text-right" : ""
                }`}
              >
                {language === "ar" ? (
                  <>
                    <AnimatedLink href="#slider" onClick={() => setOpen(false)}>
                      {translations?.navbar.activities}
                    </AnimatedLink>
                    <AnimatedLink href="#academic" onClick={() => setOpen(false)}>
                      {translations?.navbar.academics}
                    </AnimatedLink>
                    <AnimatedLink href="#about" onClick={() => setOpen(false)}>
                      {translations?.navbar.about}
                    </AnimatedLink>
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="text-main font-medium border-b-2 border-main pb-1"
                    >
                      {translations?.navbar.home}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="text-main font-medium border-b-2 border-main pb-1"
                    >
                      {translations?.navbar.home}
                    </Link>
                    <AnimatedLink href="#about" onClick={() => setOpen(false)}>
                      {translations?.navbar.about}
                    </AnimatedLink>
                    <AnimatedLink href="#academic" onClick={() => setOpen(false)}>
                      {translations?.navbar.academics}
                    </AnimatedLink>
                    <AnimatedLink href="#slider" onClick={() => setOpen(false)}>
                      {translations?.navbar.activities}
                    </AnimatedLink>
                  </>
                )}
              </nav>

              {/* زر تسجيل الدخول واللغة داخل القائمة الجانبية */}
              <div className="mt-6 flex flex-col space-y-4">
                <Link href={language === "ar" ? "/ar/auth/login" : "/auth/login"} onClick={() => setOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-[#B33791] text-[#B33791] hover:bg-[#B33791] hover:text-white font-cairo"
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-700 hover:bg-main/10 hover:border-main hover:text-main font-sans"
                  onClick={toggleLanguage}
                >
                  {language === "en" ? "AR" : "EN"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
