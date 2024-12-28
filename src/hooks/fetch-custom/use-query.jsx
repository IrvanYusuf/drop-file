import { AxiosError } from 'axios';
import { useQuery as useQueryLib } from '@tanstack/react-query';

import { httpClient, httpClientDev } from 'src/libs/http-client';

export function useQuery(queryKey, endpoint, options) {
  const { params, __DEV__, ...restOptions } = options ?? {};
  const _httpClient = __DEV__ ? httpClientDev : httpClient;

  const fetcher = ({ signal }) =>
    _httpClient.get(endpoint, { signal, params }).then((response) => response.data);

  const { data, isError, error, refetch, isRefetching, isLoading, isFetching } = useQueryLib(
    queryKey,
    fetcher,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: false,
      ...restOptions,
    }
  );

  let errorMessage = String(error);
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data.message;
  }

  const isLoadingState = isLoading || isRefetching;
  const isReady = !isLoadingState && !isError;
  const isEmpty = !isLoadingState && data?.data?.length === 0;

  return {
    message: data?.message ?? '',
    data: isEmpty || isError ? [] : (data?.data ?? data),
    pagination: data?.pagination,
    error: errorMessage,
    isFetching,
    isLoading,
    isRefetching,
    isError,
    isReady,
    refetch,
    isEmpty,
  };
}
