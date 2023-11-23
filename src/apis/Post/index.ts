import { authInstance } from '../InitAxios';

export const PostAuction = async (data: FormData) => {
  const res = await authInstance.post('/boards', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};
