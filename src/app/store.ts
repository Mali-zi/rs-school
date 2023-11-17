import { configureStore } from '@reduxjs/toolkit';
import booksPerPageReducer from '../features/booksPerPageSlice';
import searchReducer from '../features/searchSlice';
import curentPageReducer from '../features/curentPageSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { libraryApi } from './services/api';

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    booksPerPage: booksPerPageReducer,
    search: searchReducer,
    curentPage: curentPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libraryApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
