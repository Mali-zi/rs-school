import { createSlice } from '@reduxjs/toolkit';
import { IData } from '../utils/interfaces';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    profileList: [],
    image: '',
  } as IData,
  reducers: {
    addProfile: (state, action) => {
      state.profileList.unshift(action.payload);
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { addProfile, setImage } = dataSlice.actions;
export default dataSlice.reducer;
