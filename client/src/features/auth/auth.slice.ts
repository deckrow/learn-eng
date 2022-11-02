import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import { login } from '../../app/services/auth/auth.service';

// types
import type { JwtPayload } from 'jwt-decode';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type AuthState = {
	user: string | null;
	token: string | null;
	isAuthenticated: boolean;
};

type StorageUser = {
	name: string;
	token: string;
};

// slice
const storageUserName: string = 'learn-eng-user';
const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => {
			localStorage.removeItem(storageUserName);

			return initialState;
		},
		loginFromStorage: (state) => {
			const user = localStorage.getItem(storageUserName);

			if (!user) return;

			const { token, name }: StorageUser = JSON.parse(user);
			const decoded: JwtPayload = jwtDecode(token);

			if (decoded.exp && decoded.exp < Date.now() / 1000) return;

			// TODO find another way to reuse same logic
			// slice.actions.authUser({ name, token });
			// doesn't work inside of a slise

			state.user = name;
			state.token = token;
			state.isAuthenticated = true;
    },
		authUser: (state, action: PayloadAction<StorageUser>) => {
			const { name, token } = action.payload;

			state.user = name;
			state.token = token;
			state.isAuthenticated = true;
		},
	},
	extraReducers: (builder) => {
		// TODO research (addMatcher vs addCase)
		builder
			.addMatcher(login.matchFulfilled, (state, action) => {
				const { token, data } = action.payload;
				const { name } = data.user;

				state.user = name;
				state.token = token!;
				state.isAuthenticated = true;

				localStorage.setItem(
					storageUserName,
					JSON.stringify({ token, name })
				);
			});
	}
});

export const { logout, loginFromStorage } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;
