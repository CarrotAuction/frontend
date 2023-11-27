import { authInstance } from '@/src/apis/InitAxios';
import { RequesteUser } from '@/src/types/signup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: RequesteUser) => {
      try {
        const res = await authInstance.post('/users/register', data);
        return res.data;
      } catch (error) {
        console.log(error as AxiosError);
      }
    },
  });
};
