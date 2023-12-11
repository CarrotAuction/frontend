import { GetAuctionDetail, GetComments } from '@/src/apis/AuctionDetail';
import { PostComment } from '@/src/apis/Comment';
import { CommentType, ProductInfoType } from '@/src/types/auctionDetail';
import { Comment } from '@/src/types/comment';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const useGetDetailInfo = (boardId: string) =>
  useQuery({
    queryKey: ['BoardDetail', boardId],
    queryFn: () => GetAuctionDetail(boardId),
    enabled: false,
    refetchOnMount: true,
  });

export const useGetDetailScroll = ({
  boardId,
  comment,
  totalComments,
}: {
  boardId: string;
  comment: CommentType[];
  totalComments: number;
}) =>
  useQuery({
    queryKey: ['BoardScroll', boardId],
    queryFn: () => {
      const cursor = String(comment?.length);
      if (+cursor > totalComments) return;
      return GetComments({ boardId, cursor });
    },
    enabled: false,
  });

export const usePostComment = (
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ProductInfoType>>,
) =>
  useMutation({
    mutationFn: (data: Comment) => PostComment(data),
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: '경매 참여 완료!',
      });
      refetch();
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
