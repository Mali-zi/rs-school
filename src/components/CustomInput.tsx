import React, { useEffect } from 'react';
import { useController, Control } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setFilterCountries,
  setInputValue,
  setEditMode,
  resetValue,
} from '../features/selectedCountriesSlice';
import { IFormInput } from '../utils/interfaces';

const CustomInput = ({ control }: { control: Control<IFormInput> }) => {
  const { field } = useController({
    control,
    name: 'country',
  });

  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(
    (state) => state.selectedCountries.inputValue
  );

  useEffect(() => {
    field.onChange(inputValue);
  }, [inputValue]);

  return (
    <>
      <label htmlFor="country" className="form-label fw-semibold mb-1">
        Country
      </label>
      <input
        ref={field.ref}
        value={inputValue}
        type="text"
        className="form-control"
        onChange={(e) => {
          field.onChange(e.target.value);
          dispatch(setFilterCountries(e.target.value));
          dispatch(setInputValue(e.target.value));
        }}
        onBlur={() => {
          field.onBlur;
          dispatch(setEditMode(false));
          dispatch(resetValue());
        }}
        onFocus={() => dispatch(setEditMode(true))}
      />
    </>
  );
};

export default CustomInput;
