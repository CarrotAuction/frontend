import { RequestBoard } from '@/src/types/search';
import { authInstance } from '../InitAxios';

export const GetBoards = async (data: RequestBoard) => {
  const { searchData, area, city, category, page } = data;
  const res = await authInstance.get('/boards', {
    params: {
      titleSearch: searchData || undefined,
      provinceName: area || undefined,
      stuffCategory: category || undefined,
      page,
    },
  });
  return res.data;
};
