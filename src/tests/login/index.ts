import { authInstance } from '@/src/apis/InitAxios';
import { UserLogin } from '@/src/types/login';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: UserLogin) => {
      try {
        const response = await authInstance.post('/users/login', data);
        return response.data; // 반환값은 API 응답에서 원하는 데이터로 수정
      } catch (error) {
        console.log(error as AxiosError);
      }
    },
  });
};
