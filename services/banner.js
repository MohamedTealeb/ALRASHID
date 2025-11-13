import api from "@/lib/apis";
export const getBanner = async () => {
    const response = await api.get('/banner/get-banner', { withAuth: true });
    return response.data;
}
