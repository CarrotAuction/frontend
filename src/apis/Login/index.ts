import { UserLogin } from '@/src/types/login';
import { authInstance } from '../InitAxios';

export const PostLogin = async (data: UserLogin) => {
  const res = await authInstance.post('/users/login', data);
  return res.data;
};
