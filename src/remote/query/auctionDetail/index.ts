import {
  GetAuctionDetail,
  PostBoardLike,
} from '@/src/remote/apis/AuctionDetail';
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

export const useGetDetailInfo = (boardId: string) => {
  console.log('hi');
  return useQuery({
    queryKey: ['BoardDetail', boardId],
    queryFn: () => GetAuctionDetail(boardId),
    enabled: false,
    refetchOnMount: true,
  });
};

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
