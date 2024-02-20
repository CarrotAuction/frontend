import { PostComment } from '@/src/remote/apis/Comment';
import {
  AuctionDetail,
  BoardLike,
  ProductInfoType,
} from '@/src/types/auctionDetail';
import { Comment } from '@/src/types/comment';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { GetAuctionDetail } from '../../apis/AuctionDetail/AuctionDetail.get.api';
import { PostBoardLike } from '../../apis/AuctionDetail/AuctionDetail.post.api';

export const useGetDetailInfo = (boardId: string) => {
  return useQuery({
    queryKey: ['BoardDetail', boardId],
    queryFn: () => GetAuctionDetail(boardId),
    refetchOnMount: true,
  });
};

export const usePostComment = (boardId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Comment) => PostComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['BoardDetail'] });
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
};

export const usePostLike = ({ boardId }: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BoardLike) => PostBoardLike(data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['BoardDetail'] });
      const previousBoard = queryClient.getQueryData<AuctionDetail>([
        'BoardDetail',
        boardId,
      ]);

      queryClient.setQueryData(['BoardDetail', boardId], {
        ...previousBoard,
        board: {
          ...previousBoard?.board,
          likesCount: previousBoard!.board.likesCount + 1,
        },
      });
      return { previousBoard };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ['BoardDetail', boardId],
        context?.previousBoard,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['BoardDetail', boardId] });
    },
  });
};
