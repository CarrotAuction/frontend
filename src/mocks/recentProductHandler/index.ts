import { HttpResponse, http } from 'msw';
import { MOCK_RECENT_DATA } from './mock';

export const recentProductHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/board/recent`, () => {
    return HttpResponse.json(MOCK_RECENT_DATA);
  }),
];
