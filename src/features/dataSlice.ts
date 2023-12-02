import { createSlice } from '@reduxjs/toolkit';
import { IData } from '../utils/interfaces';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    profileList: [],
  } as IData,
  reducers: {
    addProfile: (state, action) => {
      state.profileList.unshift(action.payload);
    },
  },
});

export const { addProfile } = dataSlice.actions;
export default dataSlice.reducer;
