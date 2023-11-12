import React, { createContext, useContext, useEffect, useState } from 'react';
import { IBook, IResultContext } from '../../models/index';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import { getData } from '../../utils/services';

import { TopContext } from '../TopSection/TopSection';
import PageNumbersSection from '../PageNumbersSection/PageNumbersSection';
import BookList from '../BookList/BookList';

export const ResultContext = createContext<IResultContext>({
  books: [],
  curentPage: 1,
});

export default function ResultSection() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<IBook[]>([]);
  const [resultLoading, setResultLoading] = useState(true);
  const [fetchError, setFetchError] = useState<null | Error>(null);
  const [prevBooksPerPage, setPrevBooksPerPage] = useState(10);
  const [numFound, setNumFound] = useState<number>(0);
  const [curentPage, setCurentPage] = useState(1);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  const data = useContext(TopContext);

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
  }, [data.searchQuery, data.booksPerPage, curentPage]);

  async function fetchData(
    searchQuery: string,
    curentPage: number,
    booksPerPage: number
  ) {
    const url =
      BASE_URL +
      `search.json?q=${searchQuery}&author=conan%20doyle&offset=${
        (curentPage - 1) * booksPerPage
      }&limit=${booksPerPage}`;
    setResultLoading(true);

    getData(url)
      .then((result) => {
        setBooks(result.docs);
        setNumFound(result.numFound);
        setResultLoading(false);
      })
      .catch((err: Error | null) => {
        setFetchError(err);
        setResultLoading(false);
      });
  }

  if (fetchError) {
    return <h2>Error: {fetchError.message}</h2>;
  }

  if (resultLoading) {
    return <h2>Loading...</h2>;
  } else {
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
}
