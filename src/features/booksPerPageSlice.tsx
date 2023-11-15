import { createSlice } from '@reduxjs/toolkit';

const booksPerPageSlice = createSlice({
  name: 'booksPerPage',
  initialState: {
    selectedNumber: 10,
  },
  reducers: {
    selectNumber: (state, action) => {
      if (state.selectedNumber !== action.payload) {
        state.selectedNumber = action.payload;
      }
    },
  },
});

export const { selectNumber } = booksPerPageSlice.actions;
export default booksPerPageSlice.reducer;
