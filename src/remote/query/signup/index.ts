import { PostSignup } from '@/src/remote/apis/Signup';
import { RequesteUser } from '@/src/types/signup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (data: RequesteUser) => PostSignup(data),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '회원가입에 성공하셨습니다 !',
        text: '로그인페이지로 이동합니다.',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
          });
        }
      }
    },
  });
};
