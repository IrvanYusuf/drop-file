'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'src/libs/query-client';

export default function ReactQueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
