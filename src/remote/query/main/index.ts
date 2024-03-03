import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useLikeProductBoard = () => {
  return useQuery({
    queryKey: ['like'],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/like`,
      );
      return response.data;
    },
  });
};

export const useRecentProductBoard = () => {
  return useQuery({
    queryKey: ['recent'],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/recent`,
      );
      return response.data;
    },
  });
};

export const useExpensiveProductBoard = () => {
  return useQuery({
    queryKey: ['expensive'],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/expensive`,
      );

      return response.data;
    },
  });
};
