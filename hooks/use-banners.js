import { getBanner } from "@/services/banner";
import { useQuery } from "@tanstack/react-query";

export const useGetBanner = () => {
    return useQuery({
        queryKey: ['banner'],
        queryFn: getBanner,
    });
}