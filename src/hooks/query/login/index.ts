import { PostLogin } from '@/src/apis/Login';
import { UserLogin } from '@/src/types/login';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data: UserLogin) => PostLogin(data),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '로그인에 성공하셨습니다 !',
        text: '메인페이지로 이동합니다.',
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: '아이디 또는 비밀번호를 확인해주세요',
      });
    },
  });
};
