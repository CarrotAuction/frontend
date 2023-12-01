import { GetAuctionDetail } from '@/src/apis/AuctionDetail';
import { PostComment } from '@/src/apis/Comment';
import { Comment } from '@/src/types/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const useGetDetailInfo = (boardId: string) =>
  useQuery({
    queryKey: ['BoardDetail', boardId],
    queryFn: () => GetAuctionDetail(boardId),
    enabled: false,
  });

export const usePostComment = () =>
  useMutation({
    mutationFn: (data: Comment) => PostComment(data),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '경매 참여 완료!',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
          });
        }
      }
    },
  });
