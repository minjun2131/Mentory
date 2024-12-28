import { registerMentor } from '@/lib/mentor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegisterMentor = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: registerMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
    },
    onError: (error) => {
      console.log('🚀 ~ useRegisterMentor ~ error:', error);
    }
  });
  return mutation;
};
