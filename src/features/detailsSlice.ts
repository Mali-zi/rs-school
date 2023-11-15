import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import { IBookDetails } from '../models';
import { BASE_URL } from '../utils/const';
import { getData } from '../utils/services';

interface IDetailState {
  bookDetails: IBookDetails | null;
  status: string;
  detailsError: SerializedError | null | string;
  detailsLoading: boolean;
}

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async (key: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    const url = BASE_URL + `works/${key}.json`;
    try {
      const data = await getData(url);
      return fulfillWithValue(data);
    } catch (error: unknown) {
      throw rejectWithValue(error);
    }
  }
);

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    bookDetails: null,
    status: 'idle',
    detailsError: null,
    detailsLoading: false,
  } as IDetailState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.bookDetails = action.payload;
          state.detailsLoading = false;
        } else {
          state.detailsError = action.payload;
          state.detailsLoading = false;
        }
      })
      .addCase(fetchDetails.pending, (state) => {
        state.status = 'pending';
        state.detailsError = null;
        state.detailsLoading = true;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.detailsError = action.payload;
          state.detailsLoading = false;

          console.log('action.payload', action.payload);
        } else {
          state.detailsError = 'Ошибка при загрузке данных.';
          state.detailsLoading = false;
        }
      });
  },
});

export default detailsSlice.reducer;
