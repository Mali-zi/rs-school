import { createSlice } from '@reduxjs/toolkit';
import { allCountries } from '../utils/const';

const selectedCountriesSlice = createSlice({
  name: 'selectedCountries',
  initialState: {
    selectedCountry: allCountries[0],
    filterCountries: allCountries,
    inputValue: '',
    editMode: false,
  },
  reducers: {
    setFilterCountries: (state, action) => {
      if (action.payload.trim().length > 0) {
        const filterArr = allCountries.filter((country) =>
          country.toLowerCase().includes(action.payload.toLowerCase().trim())
        );
        if (filterArr.length > 0) {
          state.filterCountries = filterArr;
        } else {
          state.filterCountries = ['No options'];
        }
      }
    },

    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },

    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },

    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const { setFilterCountries, setInputValue, setCountry, setEditMode } =
  selectedCountriesSlice.actions;
export default selectedCountriesSlice.reducer;
