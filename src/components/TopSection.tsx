import React, { useEffect, useState } from 'react';
import BottomSection from './BottomSection';

export default function TopSection() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      setValue(JSON.parse(prevSearch));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim()) {
      localStorage.setItem('search', JSON.stringify(value.trim()));
      setSearchQuery(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <>
      <section className="col-lg-6 col-md-12">
        <h2 className="planet-list-header">Planet List</h2>
        <div className="mb-3">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="search-form"
              className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
            >
              Search by planet name
              <div className="container-fluid d-flex p-0 align-items-stretch mt-2">
                <input
                  id="search-form"
                  type="text"
                  className="form-control w-100 border-4 border-primary"
                  placeholder="Enter a search query"
                  autoFocus
                  value={value}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="submit"
                  className="btn btn-primary ms-2 flex-shrink-1"
                  value="Search"
                />
              </div>
            </label>
          </form>
          {isValid ? (
            <></>
          ) : (
            <p className="text-danger fs-5">The query isn&apos;t valid</p>
          )}
        </div>
      </section>
      <hr />
      <BottomSection searchQueryProps={searchQuery} />
    </>
  );
}
