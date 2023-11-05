import React, { useContext, useEffect, useState } from 'react';
import { IBook } from '../models/index';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Book from './Book';
import { BASE_URL } from '../utils/const';

import { TopContext } from '../pages/Home';
import PageNumbersSection from './PageNumbersSection';

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
          <div className="col">
            <ul className="row row-cols-1 row-cols-sm-2 g-4">
              {books.map((book) => (
                <li key={book.key}>
                  <Link key={book.key} to={`/${curentPage}${book.key}`}>
                    <Book book={book} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Outlet />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4"></div>
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
