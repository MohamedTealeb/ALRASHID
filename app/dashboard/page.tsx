"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ASSETS_PATHS } from '@/components/constants/AssetsPaths';
import { Users, BookOpen, FileText, Settings, LogOut, BarChart3, Calendar, UserPlus } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { translations } = useLanguage();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in and has admin role
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('user_role');
      const token = localStorage.getItem('access_token');
      
      if (!token || role !== 'admin') {
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
                  {translations?.dashboard?.adminTitle || "Admin Dashboard"}
                </h1>
                <p className="text-sm text-gray-600 font-cairo">
                  {translations?.dashboard?.adminWelcome || "Welcome back, Admin!"}
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
          {/* Total Students */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.totalStudents || "Total Students"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">1,247</p>
              </div>
              <Users className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Total Courses */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.totalCourses || "Total Courses"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">24</p>
              </div>
              <BookOpen className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.pendingAssignments || "Pending Assignments"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">156</p>
              </div>
              <FileText className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-cairo">
                  {translations?.dashboard?.analytics || "Analytics"}
                </p>
                <p className="text-2xl font-bold text-[#B33791]">View</p>
              </div>
              <BarChart3 className="w-8 h-8 text-[#B33791]" />
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 font-cairo">
              {translations?.dashboard?.quickActions || "Quick Actions"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <UserPlus className="w-6 h-6 text-[#B33791]" />
                <span className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.addUser || "Add User"}
                </span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <BookOpen className="w-6 h-6 text-[#B33791]" />
                <span className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.addCourse || "Add Course"}
                </span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Calendar className="w-6 h-6 text-[#B33791]" />
                <span className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.schedule || "Schedule"}
                </span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-6 h-6 text-[#B33791]" />
                <span className="text-sm font-medium text-gray-900 font-cairo">
                  {translations?.dashboard?.settings || "Settings"}
                </span>
              </button>
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
                    {translations?.dashboard?.newStudentEnrolled || "New student enrolled in Grade 10"}
                  </p>
                  <p className="text-xs text-gray-500 font-cairo">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 font-cairo">
                    {translations?.dashboard?.courseCreated || "New course 'Advanced Mathematics' created"}
                  </p>
                  <p className="text-xs text-gray-500 font-cairo">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 font-cairo">
                    {translations?.dashboard?.assignmentPosted || "Assignment posted for Grade 9 Science"}
                  </p>
                  <p className="text-xs text-gray-500 font-cairo">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-cairo">
            {translations?.dashboard?.statisticsOverview || "Statistics Overview"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#B33791] mb-2">98%</p>
              <p className="text-sm text-gray-600 font-cairo">
                {translations?.dashboard?.attendanceRate || "Attendance Rate"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#B33791] mb-2">85%</p>
              <p className="text-sm text-gray-600 font-cairo">
                {translations?.dashboard?.assignmentCompletion || "Assignment Completion"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#B33791] mb-2">92%</p>
              <p className="text-sm text-gray-600 font-cairo">
                {translations?.dashboard?.overallPerformance || "Overall Performance"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
