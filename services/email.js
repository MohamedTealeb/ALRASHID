import api from "@/lib/apis.js";

export async function sendEmail(data){
    const response = await api.post('/email',data);
    return response.data;
}