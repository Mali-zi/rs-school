import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  curentPage: 1,
};

const curentPageSlice = createSlice({
  name: 'curentPage',
  initialState,
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
