import api from "@/lib/apis.js";
import { AxiosRequestConfig } from "axios";

export async function login(email: string, password: string) {
   const response = await api.post("/auth/login", {
    email,
    password,
   });
   return response.data;
}

export async function loginWithStudentId(studentId: number, parentId: number) {
   const response = await api.post("/auth/login", {
    studentId,
    parentId,
   });
   return response.data;
}

export async function addUser(data:any) {
    const response=await api.post("/auth/addUser",data,{WithAuth:true} as AxiosRequestConfig);
    return response.data;
}

export async function getAllUsers() {
    const response=await api.get("/auth/get-excel-file",{WithAuth:true} as AxiosRequestConfig);
    return response.data;
}

export async function addExcelFile(data:any) {
    const response=await api.post("/auth/upload-excel-file",data,{WithAuth:true} as AxiosRequestConfig);
    return response.data;
}
export async function updateProfile(data:any) {
    const response=await api.put("/auth/update-profile",data,{WithAuth:true} as AxiosRequestConfig);
    return response.data;
    
}
export async function deleteUser(id:number) {
    const response=await api.delete(`/auth/delete-user/${id}`,{WithAuth:true} as AxiosRequestConfig);
    return response.data;
}


