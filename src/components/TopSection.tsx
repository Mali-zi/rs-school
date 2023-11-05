import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TopContext } from '../pages/Home';

export default function TopSection() {
  const initData = useContext(TopContext);
  const initSearchQuery = initData ? initData.searchQuery : '';

  const [value, setValue] = useState(initSearchQuery);
  const [searchQuery, setSearchQuery] = useState(initSearchQuery);
  const [isValid, setIsValid] = useState(true);
  const [booksPerPage, setBooksPerPage] = useState<number>(10);
  const booksPerPageArray: number[] = [10, 20, 30, 40, 50];

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/1');
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      localStorage.setItem('search', JSON.stringify(query));
      setSearchQuery(query);
      setIsValid(true);
      navigate('/1', {
        state: { query, booksPerPage },
      });
    } else {
      setIsValid(false);
    }
  }

  const booksPerPageSection = booksPerPageArray.map((item, index) => {
    return (
      <option key={index} className="text-bg-light fs-5 p-2" value={item}>
        {item}
      </option>
    );
  });

  return (
    <TopContext.Provider value={{ searchQuery, booksPerPage }}>
      <section className="col-lg-6 col-md-12">
        <h2 className="planet-list-header">For Conan Doyle fans</h2>
        <div className="mb-3">
          <label className="form-label d-flex flex-column justify-content-start align-items-start fs-5 mb-4">
            Books Per Page:
            <select
              name="selectedNumber"
              className="btn btn-secondary dropdown-toggle"
              value={booksPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setBooksPerPage(Number(e.target.value))
              }
            >
              {booksPerPageSection}
            </select>
          </label>
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
      <Outlet />
    </TopContext.Provider>
  );
}
