import { RefetchOptions } from '@tanstack/react-query';

export type ProductInfoType = {
  createAt: string;
  id: number;
  stuffName: string;
  stuffContent: string;
  stuffPrice: number;
  stuffCategory: string;
  imageUrl: string;
  creator: {
    id: number;
    nickname: string;
    province: {
      name: string;
    };
    city: {
      name: string;
    };
  };
};

export type CommentType = {
  createAt: string;
  id: number;
  price: number;
  openChatUrl: string;
  creator: {
    nickname: string;
  };
};

export type CustomRefetchOptions = RefetchOptions & {
  boardId?: string;
};
