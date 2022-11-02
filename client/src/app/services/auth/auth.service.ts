import { retry } from '@reduxjs/toolkit/query/react';
import { api } from '../api/api.service';

import type { Response } from '../../../types/response/response.types';
import type { User } from '../../../types/auth/auth.types';

export type LoginResponse = Response<{
	user: {
		_id: string;
		name: string;
		email: string;
	};
}>;

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, User>({
			query: (user) => ({
				url: '/users/login',
				method: 'post',
				body: user
			}),

			// disable extra retries
			extraOptions: {
				backoff: () => {
					retry.fail({ fake: 'error' });
				}
			}
		})
	})
});

export const { useLoginMutation } = authApi;

export const {
	endpoints: { login }
} = authApi;
