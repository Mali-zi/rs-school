import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setInputValue,
  setCountry,
  setEditMode,
} from '../features/selectedCountriesSlice';
import styles from './FormFirst.module.scss';

export default function CountryList() {
  const dispatch = useAppDispatch();
  const { filterCountries } = useAppSelector(
    (state) => state.selectedCountries
  );

  const handleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    country: string
  ) => {
    dispatch(setCountry(country));
    dispatch(setInputValue(country));
    dispatch(setEditMode(false));
    event.stopPropagation();
  };

  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdownList}>
        {filterCountries.map((country) => {
          return (
            <li
              key={country}
              onMouseDown={(event) => handleClick(event, country)}
              className={styles.country}
            >
              {country}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
