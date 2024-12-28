import { useMutation as useMutationLib } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { httpClient, httpClientDev } from 'src/libs/http-client';

export function useMutation(method, endpoint, options) {
  const { __DEV__, params, ...restOptions } = options ?? {};
  const _httpClient = __DEV__ ? httpClientDev : httpClient;

  const fetcher = (payload) => {
    if (payload instanceof FormData) {
      return _httpClient(endpoint, {
        method,
        params,
        data: payload,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => response.data);
    }
    return _httpClient(endpoint, { method, params, data: payload }).then(
      (response) => response.data
    );
  };

  const { error, ...restMutation } = useMutationLib(fetcher, { ...restOptions });

  let errorMessage = String(error);
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.error?.message ?? error.response?.data?.message;
  }

  return { error: errorMessage, ...restMutation };
}
