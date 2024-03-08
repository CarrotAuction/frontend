import { HttpHandler } from 'msw';
import { expensiveProductHandlers } from './expensiveProductHandler';
import { likeProductHandlers } from './likeProductHandler';
import { recentProductHandlers } from './recentProductHandler';

export const handlers: HttpHandler[] = [
  ...expensiveProductHandlers,
  ...likeProductHandlers,
  ...recentProductHandlers,
];
