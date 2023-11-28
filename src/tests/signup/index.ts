import { PostSignup } from '@/src/apis/Signup';
import { RequesteUser } from '@/src/types/signup';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: RequesteUser) => {
      return PostSignup(data);
    },
    onError() {
      return { error: 'error' };
    },
  });
};
