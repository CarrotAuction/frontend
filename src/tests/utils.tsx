import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
};

export function WithAllContexts({ children }: { children: React.ReactNode }) {
  const Client = createTestQueryClient();
  return <QueryClientProvider client={Client}>{children}</QueryClientProvider>;
}
