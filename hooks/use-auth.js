"use client";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {login, getProfile} from "@/services/auth";
import { useRouter } from "next/navigation";

export  function useLogin(){
   return useMutation({
    mutationFn: login,
    onSuccess:(res)=>{ 
     const access_token = res?.data?.access_token;
      const refresh_token = res?.data?.refresh_token;

      if (access_token && refresh_token) {
        Cookies.set("access_token", access_token, { expires: 1 }); // يوم واحد
        Cookies.set("refresh_token", refresh_token, { expires: 7 }); // أسبوع واحد
      }

    }
  });
}

export function useLogout() {
  const router = useRouter();
  
  const logout = () => {
    // حذف التوكن من الكوكيز
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    
    // إعادة توجيه إلى صفحة تسجيل الدخول
    router.push("/");
  };
  
  return logout;
}
export function useGetProfile(){
  return useMutation({
    mutationFn: getProfile,
    onSuccess:(res)=>{
      console.log(res);
    }
  });
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get("access_token");
      setIsAuthenticated(!!accessToken);
    };
    
    checkAuth();
    
    // Check authentication status when cookies change
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return { isAuthenticated };
}