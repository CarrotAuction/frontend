import { Comment } from '@/src/types/comment';
import { authInstance } from '../InitAxios';

export const PostComment = async (data: Comment) => {
  const res = await authInstance.post('/comments', data);
  return res.data;
};
