import {
  configureStore,
  ConfigureStoreOptions,
  ThunkAction,
  Action,
  combineReducers
} from '@reduxjs/toolkit';

import { api } from './services/api/api.service';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/auth.slice';
import wordsReducer from '../features/words/words.slice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  counter: counterReducer,
  auth: authReducer,
  words: wordsReducer
});

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: rootReducer,

    // api slice's middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),

    ...options
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
