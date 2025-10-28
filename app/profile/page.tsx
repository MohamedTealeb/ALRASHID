"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useLogout } from "@/hooks/use-auth";
import { getProfile } from "@/services/auth";
import { ASSETS_PATHS } from "@/components/constants/AssetsPaths";
import { User, ArrowLeft, Settings, Calendar, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";

// TypeScript interfaces
interface Subject {
  _id?: string;
  subject: string;
  marksScored: number;
  maxMarks: number;
  passedMarks: number;
  grade: string;
}

interface Result {
  _id?: string;
  studentName: string;
  yearId: string;
  className: string;
  division?: string;
  civilId: string;
  percentage: number;
  totalMarksScored: number;
  totalMaxMarks: number;
  totalPassedMarks: number;
  subjects: Subject[];
}

interface UserData {
  studentName: string;
  parentName: string;
  StudentID: string;
  yearId: string;
  className: string;
  role: string;
}

interface ProfileData {
  data: {
    user: UserData;
    results: Result[];
  };
}

export default function ProfilePage() {
  const { language, translations } = useLanguage();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const logout = useLogout();

  const profileMutation = useMutation({
    mutationFn: async () => {
      return await getProfile();
    },
    onSuccess: (data) => {
      console.log("Profile data:", data);
      setProfileData(data);
      setRawResponse(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      console.log("Profile error:", error);
      setRawResponse(JSON.stringify(error, null, 2));
    },
  });

  useEffect(() => {
    profileMutation.mutate();
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Image 
              src={ASSETS_PATHS.logo} 
              alt="ALRASHID Indian School" 
              width={48}
              height={48}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 font-cairo">
                {translations?.navbar.brand || "ALRASHID Indian School"}
              </h3>
              <p className="text-gray-600 font-cairo text-sm">
                {translations?.navbar.brandEn || "Educational Excellence"}
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 font-cairo leading-relaxed">
            {language === "ar" 
              ? "مرحباً بك في نظام إدارة مدرسة الراشد الهندية. يمكنك من خلال هذه الصفحة عرض نتائجك الدراسية وتتبع تقدمك الأكاديمي."
              : "Welcome to the ALRASHID Indian School management system. You can view your academic results and track your progress through this page."
            }
          </p>
        </div>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <Button variant="outline" size="icon" className="hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 font-cairo">
              {language === "ar" ? "نتائج الطالب" : "Student Results"}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
           
            <Button
              variant="outline"
              onClick={logout}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-cairo flex items-center gap-2 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              {language === "ar" ? "تسجيل الخروج" : "Logout"}
            </Button>
          </div>
        </div>

     

        {/* Error State */}
        {profileMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <h3 className="text-red-800 font-cairo font-semibold mb-2">
              {language === "ar" ? "خطأ في تحميل البيانات" : "Error Loading Data"}
            </h3>
            <pre className="text-red-600 text-sm overflow-auto max-h-40 font-mono">
              {rawResponse}
            </pre>
          </div>
        )}

        {/* User Profile Info */}
        {profileData && profileData.data && profileData.data.user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-20 h-20 bg-[#B33791]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-[#B33791]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-gray-800 font-cairo mb-1">
                  {profileData.data.user.studentName}
                </h2>
                <p className="text-gray-600 font-cairo">
                  {language === "ar" ? "اسم الوالد/الوالدة:" : "Parent Name:"} {profileData.data.user.parentName}
                </p>
              </div>
              <div className={`text-right ${language === "ar" ? "text-right" : "text-left"} flex-shrink-0`}>
                <div className="text-sm text-gray-600 font-cairo">
                  {language === "ar" ? "رقم الطالب" : "Student ID"}
                </div>
                <div className="text-lg font-bold text-[#B33791] font-cairo">
                  {profileData.data.user.StudentID}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-blue-600 font-cairo">
                      {language === "ar" ? "السنة الدراسية" : "Academic Year"}
                    </p>
                    <p className="text-lg font-bold text-blue-800 font-cairo truncate">
                      {profileData.data.user.yearId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-green-600 font-cairo">
                      {language === "ar" ? "الفصل" : "Class"}
                    </p>
                    <p className="text-lg font-bold text-green-800 font-cairo truncate">
                      {profileData.data.user.className}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-purple-600 font-cairo">
                      {language === "ar" ? "الدور" : "Role"}
                    </p>
                    <p className="text-lg font-bold text-purple-800 font-cairo truncate">
                      {profileData.data.user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Results */}
        {profileData && profileData.data && profileData.data.results && Array.isArray(profileData.data.results) && profileData.data.results.length > 0 ? (
          <div className="space-y-6">
            {profileData.data.results.map((result: Result, index: number) => (
              <div key={result._id || index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Student Info Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-[#B33791]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-[#B33791]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-gray-800 font-cairo mb-2">
                      {result.studentName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 font-cairo">
                      <span><strong>{language === "ar" ? "السنة الدراسية:" : "Academic Year:"}</strong> {result.yearId}</span>
                      <span><strong>{language === "ar" ? "القسم:" : "Division:"}</strong> {result.division || "N/A"}</span>
                      <span><strong>{language === "ar" ? "الرقم المدني:" : "Civil ID:"}</strong> {result.civilId}</span>
                    </div>
                  </div>
                  <div className={`text-center lg:text-right ${language === "ar" ? "lg:text-right" : "lg:text-left"} flex-shrink-0`}>
                    <div className="text-3xl font-bold text-[#B33791] font-cairo">
                      {result.percentage}%
                    </div>
                    <div className="text-sm text-gray-600 font-cairo">
                      {language === "ar" ? "النسبة المئوية" : "Percentage"}
                    </div>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-blue-600 font-cairo">{result.totalMarksScored}</div>
                    <div className="text-sm text-blue-600 font-cairo">{language === "ar" ? "الدرجات المحققة" : "Marks Scored"}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center hover:bg-green-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-green-600 font-cairo">{result.totalMaxMarks}</div>
                    <div className="text-sm text-green-600 font-cairo">{language === "ar" ? "الدرجات الكاملة" : "Total Marks"}</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-purple-600 font-cairo">{result.subjects?.length || 0}</div>
                    <div className="text-sm text-purple-600 font-cairo">{language === "ar" ? "عدد المواد" : "Subjects"}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center hover:bg-orange-100 transition-colors duration-200">
                    <div className="text-2xl font-bold text-orange-600 font-cairo">{result.totalPassedMarks}</div>
                    <div className="text-sm text-orange-600 font-cairo">{language === "ar" ? "درجات النجاح" : "Passing Marks"}</div>
                  </div>
                </div>

                {/* Subjects Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className={`border-b border-gray-200 px-4 py-3 font-semibold text-gray-700 font-cairo ${language === "ar" ? "text-right" : "text-left"}`}>
                          {language === "ar" ? "المادة" : "Subject"}
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 font-cairo">
                          {language === "ar" ? "الدرجة المحققة" : "Marks Scored"}
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 font-cairo">
                          {language === "ar" ? "الدرجة الكاملة" : "Max Marks"}
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 font-cairo">
                          {language === "ar" ? "درجة النجاح" : "Passing Marks"}
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 font-cairo">
                          {language === "ar" ? "التقدير" : "Grade"}
                        </th>
                        <th className="border-b border-gray-200 px-4 py-3 text-center font-semibold text-gray-700 font-cairo">
                          {language === "ar" ? "الحالة" : "Status"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects?.map((subject: Subject, subjectIndex: number) => {
                        const isPassed = subject.marksScored >= subject.passedMarks;
                        return (
                          <tr key={subject._id || subjectIndex} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className={`border-b border-gray-200 px-4 py-3 font-medium text-gray-800 font-cairo ${language === "ar" ? "text-right" : "text-left"}`}>
                              {subject.subject}
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 text-center font-cairo">
                              <span className={`font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                                {subject.marksScored}
                              </span>
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 text-center text-gray-600 font-cairo">
                              {subject.maxMarks}
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 text-center text-gray-600 font-cairo">
                              {subject.passedMarks}
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold font-cairo ${
                                subject.grade === 'A*' ? 'bg-yellow-100 text-yellow-800' :
                                subject.grade === 'A' ? 'bg-green-100 text-green-800' :
                                subject.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                                subject.grade === 'C' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {subject.grade || 'N/A'}
                              </span>
                            </td>
                            <td className="border-b border-gray-200 px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold font-cairo ${
                                isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isPassed ? (language === "ar" ? "نجح" : "Passed") : (language === "ar" ? "راسب" : "Failed")}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : profileData && profileData.data && profileData.data.results && Array.isArray(profileData.data.results) && profileData.data.results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-10 w-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 font-cairo mb-2">
              {language === "ar" ? "لا توجد نتائج متاحة حالياً" : "No Results Available"}
            </h3>
            <p className="text-gray-600 font-cairo leading-relaxed">
              {language === "ar" 
                ? "لم يتم رفع نتائجك الدراسية بعد. يرجى مراجعة المدرسة أو المحاولة لاحقاً."
                : "Your academic results have not been uploaded yet. Please check with the school or try again later."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
