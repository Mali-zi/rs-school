import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice';
import selectedCountriesReducer from '../features/selectedCountriesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    selectedCountries: selectedCountriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
