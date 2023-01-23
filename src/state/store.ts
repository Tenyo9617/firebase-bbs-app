import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { api } from './api';
import application from './home/reducer';
import user from './user/reducer';

export const store = configureStore({
  reducer: {
    application,
    user,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
