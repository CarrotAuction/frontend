import { postRequest } from '../requests.api';

export const PostBoardLike = async ({
  boardId,
  userId,
}: {
  boardId: string;
  userId: string;
}) => {
  const response = await postRequest<null, { boardId: string; userId: string }>(
    `/boards${boardId}/likes`,
    { boardId, userId },
  );

  return response;
};
