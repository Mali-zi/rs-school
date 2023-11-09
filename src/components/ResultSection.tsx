import React, { createContext, useContext, useEffect, useState } from 'react';
import { IBook, IResultContext } from '../models/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/const';

import { TopContext } from '../pages/Home/Home';
import PageNumbersSection from './PageNumbersSection';
import BookList from './BookList';

export const ResultContext = createContext<IResultContext>({
  books: [],
  curentPage: 1,
});

export default function ResultSection() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [prevBooksPerPage, setPrevBooksPerPage] = useState(10);
  const [numFound, setNumFound] = useState<number>(0);
  const [curentPage, setCurentPage] = useState(1);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  const data = useContext(TopContext);

  useEffect(() => {
    if (data) {
      fetchData(data.searchQuery, 1, data.booksPerPage);
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (
        prevBooksPerPage !== data.booksPerPage ||
        data.searchQuery !== prevSearchQuery
      ) {
        setCurentPage(1);
        fetchData(data.searchQuery, 1, data.booksPerPage);
        navigate('/1');
      } else {
        fetchData(data.searchQuery, curentPage, data.booksPerPage);
      }
      setPrevBooksPerPage(data.booksPerPage);
      setPrevSearchQuery(data.searchQuery);
    }
  }, [data, curentPage]);

  async function fetchData(
    searchQuery: string,
    curentPage: number,
    booksPerPage: number
  ) {
    setIsLoading(true);
    const url =
      BASE_URL +
      `search.json?q=${searchQuery}&author=conan%20doyle&offset=${
        (curentPage - 1) * booksPerPage
      }&limit=${booksPerPage}`;

    await fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Server responds with error!');
        }
        return resp.json();
      })
      .then((result) => {
        setBooks(result.docs);
        setNumFound(result.numFound);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (books && numFound) {
    return (
      <div>
        <PageNumbersSection
          numFound={numFound}
          curentPage={curentPage}
          setCurentPage={setCurentPage}
        />
        <div className="row">
          <ResultContext.Provider value={{ books, curentPage }}>
            <BookList />
          </ResultContext.Provider>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
