import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setFilterCountries,
  setInputValue,
  setCountry,
  setEditMode,
} from '../features/selectedCountriesSlice';

export default function CountryInput() {
  const dispatch = useAppDispatch();
  const { selectedCountry, filterCountries, inputValue, editMode } =
    useAppSelector((state) => state.selectedCountries);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        dispatch(setEditMode(false));
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [editMode]);

  const handleClick = (country: string) => {
    dispatch(setCountry(country));
    dispatch(setInputValue(country));
    dispatch(setEditMode(false));
  };

  return (
    <>
      {editMode ? (
        // display the dropdown when the input us focused
        <div ref={dropdownRef} className="dropdown-wrapper">
          <input
            id="search"
            type="text"
            autoComplete="search"
            className="form-control bg-info"
            autoFocus
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <div className="dropdown-list">
            <ul>
              {filterCountries.map((country) => {
                return (
                  <li key={country} onClick={() => handleClick(country)}>
                    {country}
                  </li>
                );
              })}
              {filterCountries.length === 0 && (
                <li className="no-result">No results found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <input
          // Grey out the text when "Select Primary skill" input hint is shown
          onFocus={() => setEditMode(true)}
          // Display the selected skill or "Select Primary skill" input hint
          value={selectedCountry && 'Select your country'}
        />
      )}

      <label htmlFor="country" className="form-label fw-semibold mb-1">
        Country
      </label>
      <input
        id="search"
        type="text"
        autoComplete="search"
        className="form-control"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <select
        id="country-list"
        className="form-control"
        autoComplete="search"
        required={true}
        value={filterCountries}
        onChange={(e) => dispatch(setFilterCountries(e.target.value))}
      >
        <option value="" disabled>
          Please Select...
        </option>
        {filterCountries.map((country) => {
          return (
            <option value={country} key={country}>
              {country}
            </option>
          );
        })}
      </select>
    </>
  );
}
