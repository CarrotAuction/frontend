import { RequestBoard } from '@/src/types/search';
import { AuctionDetail } from '@/src/types/auctionDetail';
import { getRequest } from '../requests.api';

export const GetAuctionDetail = async (id: string) => {
  const response = await getRequest<AuctionDetail>(`/boards/${id}`);

  return response;
};

export const GetComments = async ({
  boardId,
  cursor,
}: {
  boardId: string;
  cursor: number;
}) => {
  if (!cursor) return;
  const response = await getRequest<any>(
    `/comments?boardId=${boardId}&cursor=${cursor}`,
  );
  return response;
};
