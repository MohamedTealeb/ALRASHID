"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS_PATHS } from '@/components/constants/AssetsPaths';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { loginWithStudentId } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    parentId: ''
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { studentId: string; parentId: string }) => {
      return await loginWithStudentId(parseInt(credentials.studentId), parseInt(credentials.parentId));
    },
    onSuccess: (data) => {
      // Handle successful login
      const { role, token } = data;
      
      // Store token in cookies or localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_role', role);
      }
      
      // Navigate based on role
      if (role === 'admin') {
        router.push('/dashboard');
      } else if (role === 'student') {
        router.push('/student-dashboard');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Handle login error (show toast, etc.)
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* زر تبديل اللغة */}
      <div className="absolute top-4 right-4 z-20">
        <Link href="/auth/login">
          <button className="bg-white hover:bg-gray-50 text-[#B33791] hover:text-[#a02e80] px-4 py-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200 font-cairo font-semibold">
            English
          </button>
        </Link>
      </div>

      {/* الخلفية الزخرفية */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B33791]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* البطاقة الرئيسية */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
          {/* الشعار */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#B33791]/10 rounded-full flex items-center justify-center">
                <img 
                  src={ASSETS_PATHS.logo} 
                  alt="مدرسة الراشد الهندية" 
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#B33791] font-cairo mb-2">
              {translations?.login?.title || "تسجيل الدخول"}
            </h1>
            <p className="text-gray-600 font-cairo">
              {translations?.login?.subtitle || "مرحباً بك في مدرسة الراشد الهندية"}
            </p>
          </div>

          {/* النموذج */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* رقم الطالب */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2 font-cairo">
                {translations?.login?.studentId || "رقم الطالب"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:border-transparent transition-all duration-200 font-cairo text-right"
                  placeholder={translations?.login?.studentId || "رقم الطالب"}
                  required
                />
              </div>
            </div>

            {/* رقم ولي الأمر */}
            <div>
              <label htmlFor="parentId" className="block text-sm font-semibold text-gray-700 mb-2 font-cairo">
                {translations?.login?.parentId || "رقم ولي الأمر"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="parentId"
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:border-transparent transition-all duration-200 font-cairo text-right"
                  placeholder={translations?.login?.parentId || "رقم ولي الأمر"}
                  required
                />
              </div>
            </div>

            {/* خيارات إضافية */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#B33791] bg-gray-100 border-gray-300 rounded focus:ring-[#B33791] focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600 font-cairo">
                  {translations?.login?.rememberMe || "تذكرني"}
                </span>
              </label>
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-[#B33791] hover:bg-[#a02e80] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold font-cairo transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:ring-offset-2 flex items-center justify-center space-x-2"
            >
              <span>
                {loginMutation.isPending 
                  ? (translations?.login?.loggingIn || "جاري تسجيل الدخول...") 
                  : (translations?.login?.loginButton || "تسجيل الدخول")
                }
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* العودة للصفحة الرئيسية */}
          <div className="mt-6 text-center">
            <Link 
              href="/ar" 
              className="text-gray-500 hover:text-[#B33791] font-cairo text-sm transition-colors duration-200"
            >
              ← العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}