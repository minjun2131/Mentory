import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../_lib/profile"

export const useUserProfile = (isLoggedIn:boolean) => {
    const {data, isPending,isError,error } = useQuery({
        queryKey: ['users'],
        queryFn: getUserProfile,
        enabled:isLoggedIn,
        staleTime: 1000 * 60 * 5,
    });
    return {data: data || {},isPending, isError, error}
}