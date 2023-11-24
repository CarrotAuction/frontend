import { authInstance } from '../InitAxios';

type Props = {
  boardId: number;
  cursor: number;
};

export const GetAuctionDetail = async (id: string) => {
  const res = await authInstance.get(`/boards/${id}`);
  return res.data;
};

export const GetComments = async ({ boardId, cursor }: Props) => {
  const res = await authInstance.get('comments', {
    params: {
      boardId,
      cursor,
    },
  });
  return res.data;
};
