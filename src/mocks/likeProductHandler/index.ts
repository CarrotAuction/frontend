import { HttpResponse, http } from 'msw';
import { MOCK_LIKE_DATA } from './mock';

export const likeProductHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/board/like`, () => {
    return HttpResponse.json(MOCK_LIKE_DATA);
  }),
];
