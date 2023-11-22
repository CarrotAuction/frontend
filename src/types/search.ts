import { RefetchOptions } from '@tanstack/react-query';

// API
export type AllBoardType = {
  boards: BoardType[];
  totalPages: number;
};

export type BoardType = {
  createAt: Date;
  creator: CreatorInfo;
  id: number;
  stuffCategory: string;
  stuffContent: string;
  stuffName: string;
  imageUrl: string;
  stuffPrice: number;
};

export type CreatorInfo = {
  city: { name: string };
  id: number;
  province: { name: string };
};

export type PropsBoards = {
  Boards: BoardType[];
  hasMore: boolean;
};

export type RequestBoard = {
  searchData: string;
  area: string;
  city: string;
  category: string;
  page: number;
};

export type CustomRefetchOptions = RefetchOptions & {
  page?: number;
};
// UI
export type SelectOption = {
  label: string;
  value: string;
  city: CityType[];
};

export type CityType = {
  label: string;
  value: string;
};

export type CategoryType = {
  label: string;
  value: string;
};

export type SelectValueType = {
  area: string;
  city: string;
  category: string;
};

export type ShowType = {
  areaShow: boolean;
  cityShow: boolean;
  categoryShow: boolean;
};
