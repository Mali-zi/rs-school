import { configureStore } from '@reduxjs/toolkit';
import booksPerPageReducer from '../features/booksPerPageSlice';
import searchReducer from '../features/searchSlice';
import booksReducer from '../features/booksSlice';
import curentPageReducer from '../features/curentPageSlice';
import detailsReducer from '../features/detailsSlice';

export const store = configureStore({
  reducer: {
    booksPerPage: booksPerPageReducer,
    search: searchReducer,
    books: booksReducer,
    curentPage: curentPageReducer,
    details: detailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
