import { getMentorDetail } from '@/lib/mentorProfile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useUserInfo = () => {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id; // mentorId가 배열이면 첫 번째 값만 사용

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? getMentorDetail(userId) : Promise.reject('No userId')),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  });

  return { data: data || {}, isPending: isLoading, isError, error };
};
