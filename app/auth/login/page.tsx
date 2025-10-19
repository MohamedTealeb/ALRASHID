"use client";
import { toast } from 'react-toastify';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS_PATHS } from '@/components/constants/AssetsPaths';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useLogin } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const { translations, language, toggleLanguage } = useLanguage();
   const loginMutation=useLogin()
   const [form,setForm]=useState({studentId:'',parentId:''})
   const [show,setShow]=useState(false)

   const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
      const res = await loginMutation.mutateAsync(form);
      const isFrozen = res?.data?.frozen;
    
      if (isFrozen) {
        // الحساب متجمد
        toast.error("حسابك مجمد، يرجى التواصل مع الشئون الإدارية.");
      } else if (res?.data?.access_token) {
        // تسجيل الدخول ناجح
        toast.success(translations?.login?.successMessage || "Login successful!");
        router.push('/profile');
      }
    } catch {
      toast.error(
        translations?.login?.errorMessage ||
          "Login failed. Please check your credentials and try again."
      );
    }

   }

 
 

 
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* زر تبديل اللغة */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleLanguage}
          className="bg-white hover:bg-gray-50 text-[#B33791] hover:text-[#a02e80] px-4 py-2 rounded-full shadow-lg border border-gray-200 transition-all duration-200 font-cairo font-semibold"
        >
          {language === 'ar' ? 'English' : 'العربية'}
        </button>
      </div>

      {/* الخلفية الزخرفية */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B33791]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#B33791]/10 rounded-full flex items-center justify-center">
                <Image 
                  src={ASSETS_PATHS.logo} 
                  alt="ALRASHID Indian School" 
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#B33791] font-cairo mb-2">
              {translations?.login?.title || "Login"}
            </h1>
            <p className="text-gray-600 font-cairo">
              {translations?.login?.subtitle || "Welcome to ALRASHID Indian School"}
            </p>
          </div>

          {/* النموذج */}
          <form  className="space-y-6" onSubmit={handleSubmit}>
            {/* رقم الطالب */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2 font-cairo">
                {translations?.login?.studentId || "Student ID"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={form.studentId}
                  onChange={(e)=>setForm({...form,studentId:e.target.value})}
                  
               
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:border-transparent transition-all duration-200 font-cairo ${
                    language === 'ar' ? 'text-right' : ''
                  }`}
                  placeholder={translations?.login?.studentId || (language === 'ar' ? "رقم الطالب" : "Student ID")}
                  required
                />
              </div>
            </div>

            {/* رقم ولي الأمر */}
            <div>
              <label htmlFor="parentId" className="block text-sm font-semibold text-gray-700 mb-2 font-cairo">
                {translations?.login?.parentId || "Password"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={show ? "text" : "password"}
                  id="parentId"
                  name="parentId"
               value={form.parentId}
                onChange={(e)=>setForm({...form,parentId:e.target.value})}
                  className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:border-transparent transition-all duration-200 font-cairo ${
                    language === 'ar' ? 'text-right' : ''
                  }`}
                  placeholder={translations?.login?.parentId || (language === 'ar' ? "رقم ولي الأمر" : "Parent ID")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* خيارات إضافية */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
               
                
                />
                <span className="ml-2 text-sm text-gray-600 font-cairo">
                  {translations?.login?.rememberMe || (language === 'ar' ? 'تذكرني' : 'Remember Me')}
                </span>
              </label>
              
           
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              className="w-full bg-[#B33791] hover:bg-[#a02e80] text-white py-3 rounded-xl font-bold font-cairo transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B33791] focus:ring-offset-2 flex items-center justify-center space-x-2"
            >
              <span>{translations?.login?.loginButton || "Login"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* العودة للصفحة الرئيسية */}
          <div className="mt-6 text-center">
            <Link 
              href="/en" 
              className="text-gray-500 hover:text-[#B33791] font-cairo text-sm transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
