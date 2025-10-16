"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS_PATHS } from '@/components/constants/AssetsPaths';
import { BookOpen, Calendar, FileText, User, LogOut } from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in and has student role
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('user_role');
      const token = localStorage.getItem('access_token');
      
      if (!token || role !== 'student') {
        router.push('/auth/login');
        return;
      }
      
      setUserRole(role);
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
    }
    router.push('/auth/login');
  };

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B33791]"></div>
          <p className="mt-4 text-gray-600 font-cairo">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src={ASSETS_PATHS.logo} 
                alt="ALRASHID Indian School" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-[#B33791] font-cairo">
                  {translations?.dashboard?.studentTitle || "Student Dashboard"}
                </h1>
                <p className="text-sm text-gray-600 font-cairo">
                  {translations?.dashboard?.welcome || "Welcome back, Student!"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#B33791] transition-colors font-cairo"
            >
              <LogOut className="w-5 h-5" />
              <span>{translations?.dashboard?.logout || "Logout"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.myCourses || "My Courses"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">8</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.assignments || "Assignments"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">12</p>
              </div>
              <FileText className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.schedule || "Schedule"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">Today</p>
              </div>
              <Calendar className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Profile */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.profile || "Profile"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">View</p>
              </div>
              <User className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-cairo">
            {translations?.dashboard?.recentActivity || "Recent Activity"}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#B33791] rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.newAssignment || "New assignment posted in Mathematics"}
                </p>
                <p className="text-xs text-gray-500 font-cairo">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.gradePosted || "Grade posted for English essay"}
                </p>
                <p className="text-xs text-gray-500 font-cairo">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.classReminder || "Reminder: Science class at 10:00 AM"}
                </p>
                <p className="text-xs text-gray-500 font-cairo">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
