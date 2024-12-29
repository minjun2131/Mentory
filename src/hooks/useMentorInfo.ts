import { getUserDetail } from '@/lib/profile';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export const useMentorInfo = () => {
  const { id } = useParams();
  const mentorId = Array.isArray(id) ? id[0] : id; // mentorId가 배열이면 첫 번째 값만 사용

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mentor', mentorId],
    queryFn: () => (mentorId ? getUserDetail(mentorId) : Promise.reject('No mentorId')),
    enabled: !!mentorId,
    staleTime: 1000 * 60 * 5
  });

  return { data: data || {}, isPending: isLoading, isError, error };
};
