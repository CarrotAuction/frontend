import { RefetchOptions } from '@tanstack/react-query';
import { StringNullableChain } from 'lodash';

export type AuctionBoard = {
  boards: ProductInfoType[];
  totalPages: number;
};

export type ProductInfoType = {
  createAt: string;
  id: number;
  stuffName: string;
  stuffContent: string;
  stuffPrice: number;
  stuffCategory: string;
  imageUrl: string;
  likesCount: number;
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

export type AuctionDetail = {
  board: ProductInfoType;
  comment: string[];
  totalComments: number;
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

export type BoardLike = {
  boardId: string;
  userId: string;
};
