import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: {
    isLoading: false,
    isFetching: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setLoading, setFetching } = loadingSlice.actions;
export default loadingSlice.reducer;
