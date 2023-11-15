import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import { IBook } from '../models';
import { BASE_URL } from '../utils/const';
import { getData } from '../utils/services';

interface IBookState {
  books: IBook[];
  numFound: number;
  status: string;
  fetchError: SerializedError | null | string;
  resultLoading: boolean;
}

interface IFetchDataProps {
  searchQuery: string;
  curentPage: number;
  booksPerPage: number;
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (
    { searchQuery, curentPage, booksPerPage }: IFetchDataProps,
    thunkApi
  ) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    const url =
      BASE_URL +
      `search.json?q=${searchQuery}&author=conan%20doyle&offset=${
        (curentPage - 1) * booksPerPage
      }&limit=${booksPerPage}`;
    try {
      const data = await getData(url);
      return fulfillWithValue(data);
    } catch (error: unknown) {
      throw rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    numFound: 0,
    status: 'idle',
    fetchError: null,
    resultLoading: false,
  } as IBookState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.books = action.payload.docs;
          state.numFound = action.payload.numFound;
          state.resultLoading = false;
        } else {
          state.fetchError = action.payload;
          state.resultLoading = false;
        }
      })
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'pending';
        state.fetchError = null;
        state.resultLoading = true;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.fetchError = action.payload;
          state.resultLoading = false;

          console.log('action.payload', action.payload);
        } else {
          state.fetchError = 'Ошибка при загрузке данных пользователя.';
          state.resultLoading = false;
        }
      });
  },
});

export default booksSlice.reducer;
