import { useQuery } from "@tanstack/react-query";
import { getImage } from "@/services/image";


export function useImage(){
    return useQuery({
        queryKey: ['image'],
        queryFn: getImage,
    });
}