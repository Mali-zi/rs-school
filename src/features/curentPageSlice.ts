import { createSlice } from '@reduxjs/toolkit';

const curentPageSlice = createSlice({
  name: 'curentPage',
  initialState: {
    curentPage: 1,
  },
  reducers: {
    setCurentPage: (state, action) => {
      if (state.curentPage !== action.payload) {
        state.curentPage = action.payload;
      }
    },
  },
});

export const { setCurentPage } = curentPageSlice.actions;
export default curentPageSlice.reducer;
