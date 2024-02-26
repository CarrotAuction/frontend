import { RequestBoard } from '@/src/types/search';
import { AuctionDetail } from '@/src/types/auctionDetail';
import axios from 'axios';
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

export const GetCurrentLocation = async (query: string) => {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API}`,
      },
    },
  );

  return response.data;
};

export const GetFindLocation = async (queryParams: URLSearchParams) => {
  const response = await axios.get(
    `https://apis-navi.kakaomobility.com/v1/directions?${queryParams}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_MAP_REST_API}`,
      },
    },
  );
  console.log(response);

  return response.data;
};
