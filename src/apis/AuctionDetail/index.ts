import { BoardLike } from '@/src/types/auctionDetail';
import { authInstance } from '../InitAxios';

type Props = {
  boardId: string;
  cursor: string;
};

export const GetAuctionDetail = async (id: string) => {
  const res = await authInstance.get(`/boards/${id}`);
  return res.data;
};

export const GetComments = async ({ boardId, cursor }: Props) => {
  const res = await authInstance.get('/comments', {
    params: {
      boardId,
      cursor: String(+cursor + 1),
    },
  });
  return res.data;
};

export const PostBoardLike = async ({ boardId, userId }: BoardLike) => {
  const res = await authInstance.post(`/boards/${boardId}/likes`, {
    boardId,
    userId,
  });
  return res.data;
};
