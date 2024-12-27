import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../lib/profile"

export const useUserProfile = () => {
    const {data, isPending,isError,error } = useQuery({
        queryKey: ['users'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5,
    });
    return {data: data || {},isPending, isError, error}
}