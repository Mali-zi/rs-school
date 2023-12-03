import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/dataSlice';
import selectedCountriesReducer from '../features/selectedCountriesSlice';

export const store = configureStore({
  reducer: {
    selectedCountries: selectedCountriesReducer,
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
