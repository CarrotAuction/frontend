import { authInstance } from '../InitAxios';

export const GetAuctionDetail = async (id: string) => {
  const res = await authInstance.get(`/boards/${id}`);
  return res.data;
};
