
import { getMentorProfile } from "@/lib/mentorProfile";
import { useQuery } from "@tanstack/react-query"

export const useMentorProfile = () => {
    const {data, isPending,isError,error } = useQuery({
        queryKey: ['mentors'],
        queryFn: getMentorProfile,
        staleTime: 1000 * 60 * 5,
    });
    return {data: data || {},isPending, isError, error}
}