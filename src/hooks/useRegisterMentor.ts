import { registerMentor } from '@/lib/mentor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRegisterMentor = (next: (nextStep: string) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: registerMentor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentors'] });
      next('completion');
    },
    onError: (error) => {
      console.log('🚀 ~ useRegisterMentor ~ error:', error);
    }
  });
  return mutation;
};
