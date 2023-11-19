import { RequesteUser, ResponseUser } from '@/src/types/signup';
import { authInstance } from '../InitAxios';

export const PostSignup = async (data: RequesteUser) => {
  const res = await authInstance.post('/users/register', data);
  return res.data;
};
