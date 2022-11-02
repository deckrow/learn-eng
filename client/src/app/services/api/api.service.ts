import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,

  tagTypes: ['Words'],
  endpoints: () => ({})
});

// TODO research enchance
export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => 'test'
  })
});
