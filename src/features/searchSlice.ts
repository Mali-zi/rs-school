import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      if (state.searchQuery !== action.payload) {
        state.searchQuery = action.payload;
      }
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
