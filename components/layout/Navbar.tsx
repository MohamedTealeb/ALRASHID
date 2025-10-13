"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, translations, toggleLanguage } = useLanguage();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-semibold text-cyan-600 ${
            language === "ar" ? "font-bold" : ""
          }`}
        >
         <img src={ASSETS_PATHS.logo} className="object-contain  h-15" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex space-x-6 text-gray-700 ${
            language === "ar" ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <Link href="/" className="hover:text-cyan-600 transition">
            {translations?.navbar.home}
          </Link>
          <Link href="/about" className="hover:text-cyan-600 transition">
            {translations?.navbar.about}
          </Link>
          <Link href="/services" className="hover:text-cyan-600 transition">
            {translations?.navbar.services}
          </Link>
          <Link href="/contact" className="hover:text-cyan-600 transition">
            {translations?.navbar.contact}
          </Link>
        </nav>

        {/* Language Toggle */}
        <Button
          variant="outline"
          className="hidden md:inline-flex"
          onClick={toggleLanguage}
        >
          {language === "en" ? "AR" : "EN"}
        </Button>

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
                <SheetTitle className="text-cyan-600">
                    {translations?.navbar.brand}
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav
                className={`mt-6 flex flex-col space-y-4 text-gray-700 ${
                  language === "ar" ? "text-right" : ""
                }`}
              >
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-600 transition"
                >
                  {translations?.navbar.home}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-600 transition"
                >
                  {translations?.navbar.about}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-600 transition"
                >
                  {translations?.navbar.services}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="hover:text-cyan-600 transition"
                >
                  {translations?.navbar.contact}
                </Link>
              </nav>

              {/* زر اللغة داخل القائمة الجانبية */}
              <Button
                variant="outline"
                className="mt-6 w-full"
                onClick={toggleLanguage}
              >
                {language === "en" ? "AR" : "EN"}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
