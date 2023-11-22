import { Post } from '@/src/types/post';
import { authInstance } from '../InitAxios';

export const PostAuction = async (data: Post) => {
  const res = await authInstance.post('/boards', data);
  return res.data;
};
