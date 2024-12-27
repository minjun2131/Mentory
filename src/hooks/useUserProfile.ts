import { useQuery } from "@tanstack/react-query"
<<<<<<< HEAD
import { getUserProfile } from "@/lib/profile"
=======
import { getUserProfile } from "../lib/profile"
>>>>>>> b7e27e8e859c10558b08fdc1a3a5bc6be63b3fd5

export const useUserProfile = () => {
    const {data, isPending,isError,error } = useQuery({
        queryKey: ['users'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5,
    });
    return {data: data || {},isPending, isError, error}
}