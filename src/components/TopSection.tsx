import React, { useEffect, useState } from 'react';
import ResultSection from './ResultSection';

export default function TopSection() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [booksPerPage, setBooksPerPage] = useState<number>(10);
  const booksPerPageArray: number[] = [10, 20, 30, 40, 50];

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

  const booksPerPageSection = booksPerPageArray.map((item, index) => {
    return (
      <li key={index}>
        <a
          role="button"
          type="button"
          className="dropdown-item"
          onClick={() => setBooksPerPage(item)}
        >
          {item}
        </a>
      </li>
    );
  });

  return (
    <>
      <section className="col-lg-6 col-md-12">
        <h2 className="planet-list-header">For Conan Doyle fans</h2>
        <div className="mb-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Books Per Page
            </button>
            <ul className="dropdown-menu">{booksPerPageSection}</ul>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="search-form"
              className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
            >
              Search for your favorite books by title
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
      <ResultSection searchQuery={searchQuery} booksPerPage={booksPerPage} />
    </>
  );
}
