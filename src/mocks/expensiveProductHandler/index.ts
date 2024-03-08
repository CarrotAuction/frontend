import { HttpResponse, http } from 'msw';
import { MOCK_EXPENSIVE_DATA } from './mock';

export const expensiveProductHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/board/expensive`, () => {
    return HttpResponse.json(MOCK_EXPENSIVE_DATA);
  }),
];
