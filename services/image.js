import api from '@/lib/apis.js';


export async function getImage(){
    const response = await api.get('/image/get-all',);
    return response.data;
}