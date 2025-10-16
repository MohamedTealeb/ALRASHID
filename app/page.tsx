"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // التحقق من اللغة المحفوظة في localStorage
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      router.push(`/${savedLanguage}`);
    } else {
      // تحديد اللغة حسب لغة المتصفح
      const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
      router.push(`/${browserLanguage}`);
    }
  }, [router, isClient]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default Page