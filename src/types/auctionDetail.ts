import { RefetchOptions } from '@tanstack/react-query';

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
  comments: CreatorCommentType[];
  totalComments: number;
};

export type CreatorCommentType = {
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
