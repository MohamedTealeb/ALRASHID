import api from "@/lib/apis.js";

export async function login(data){
    const response = await api.post('/auth/login',data);
    return response.data;
}
export async function getProfile(){
    const response = await api.get('/auth/profile',{withAuth:true});
    return response.data;
}
