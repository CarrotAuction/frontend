import { RequestBoard } from '@/src/types/search';
import { AuctionBoard } from '@/src/types/auctionDetail';
import { getRequest } from '../requests.api';

export const GetBoards = async (data: RequestBoard) => {
  const { searchData, area, city, category, page } = data;

  const isTitleSearch = searchData ? `titleSearch=${searchData}&` : '';
  const isProvinceName = area ? `provinceName=${area}&` : '';
  const isCity = city ? `city =${city}$` : '';
  const isStuffCategory = category ? `stuffCategory=${category}&` : '';
  const isPage = page ? `page=${page}` : '';

  const response = await getRequest<any>(
    `/boards?${isTitleSearch}${isProvinceName}${isCity}${isStuffCategory}${isPage}`,
  );

  return response;
};
