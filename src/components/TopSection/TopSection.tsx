import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectNumber } from '../../features/booksPerPageSlice';
import { setSearchQuery } from '../../features/searchSlice';

export default function TopSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const booksPerPageArray: number[] = [10, 20, 30, 40, 50];

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

  const booksPerPageSection = useCallback(() => {
    const list = booksPerPageArray.map((item, index) => (
      <option key={index} className="text-bg-light fs-5 p-2" value={item}>
        {item}
      </option>
    ));

    return list;
  }, []);

  useEffect(() => {
    navigate(`/1`);
  }, []);

  return (
    <>
      <section className="col-lg-6 col-md-12">
        <h2 className="planet-list-header">For Conan Doyle fans</h2>
        <div className="mb-3">
          <label className="form-label d-flex flex-column justify-content-start align-items-start fs-5 mb-4">
            Books Per Page:
            <select
              name="selectedNumber"
              id="selectedNumber"
              data-testid="selectedNumber"
              className="btn btn-secondary dropdown-toggle"
              value={booksPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                dispatch(selectNumber(Number(e.target.value)))
              }
            >
              {booksPerPageSection()}
            </select>
          </label>
          <form onSubmit={(e) => handleSubmit(e)}>
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
      </section>
      <hr />
      <Outlet />
    </>
  );
}
