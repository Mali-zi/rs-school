import { combineReducers, configureStore } from '@reduxjs/toolkit';
import booksPerPageReducer from '../features/booksPerPageSlice';
import searchReducer from '../features/searchSlice';
import curentPageReducer from '../features/curentPageSlice';
import loadingReducer from '../features/loadingSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { libraryApi } from './services/api';
import type { PreloadedState } from '@reduxjs/toolkit';

// Create the root reducer separately so we can extract the RootState type
export const rootReducer = combineReducers({
  [libraryApi.reducerPath]: libraryApi.reducer,
  booksPerPage: booksPerPageReducer,
  search: searchReducer,
  curentPage: curentPageReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
    booksPerPage: booksPerPageReducer,
    search: searchReducer,
    curentPage: curentPageReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat().concat(libraryApi.middleware),
});

setupListeners(store.dispatch);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      [libraryApi.reducerPath]: libraryApi.reducer,
      booksPerPage: booksPerPageReducer,
      search: searchReducer,
      curentPage: curentPageReducer,
      loading: loadingReducer,
    },
    preloadedState,
  });
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
