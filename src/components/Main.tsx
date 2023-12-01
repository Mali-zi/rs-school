import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../features/searchSlice';

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setIsSubmitted(false);
    setIsValid(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      dispatch(setSearchQuery(query));
      setIsValid(true);
      setIsSubmitted(true);
    } else {
      setIsValid(false);
    }
  }

  function handleClick(num: string) {
    navigate(`/${num}-form`);
  }

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          <h2 className="planet-list-header">For Conan Doyle fans</h2>
          <div className="mb-3">
            <button type="button" onClick={() => handleClick('1')}>
              1 Form
            </button>
            <button type="button" onClick={() => handleClick('2')}>
              2 Form
            </button>
          </div>
          <div className="mb-3">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="color">
                <input
                  type="checkbox"
                  name="color"
                  checked={isChecked}
                  onChange={(e) => handleChecked(e)}
                />
                Blue
              </label>
              {isChecked && <div>Blue is selected!</div>}
              <label>
                Select an option:
                <select
                  value={selectedOption}
                  onChange={(e) => handleDropdownChange(e)}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </label>
              <p>Selected option: {selectedOption}</p>
              <label
                htmlFor="search-form"
                className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
              >
                Search for your favorite books
                <div className="container-fluid d-flex p-0 align-items-stretch mt-2">
                  <input
                    id="search-form"
                    data-testid="searchbox"
                    type="text"
                    name="searchbox"
                    className="form-control w-100 border-4 border-primary"
                    placeholder="Enter a search query"
                    autoFocus
                    value={value}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="submit"
                    data-testid="submitButton"
                    className="btn btn-primary ms-2 flex-shrink-1"
                    value="Submit"
                  />
                </div>
              </label>
            </form>
            {isSubmitted && <p className="text-success fs-5">Form submitted</p>}
            {!isValid && (
              <p className="text-danger fs-5">The query isn&apos;t valid</p>
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
