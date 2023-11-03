import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import { IBottomSectionProps, IBook } from '../models/index';

const BASE_URL = 'https://openlibrary.org/';

export default function ResultSection({
  searchQuery,
  booksPerPage,
}: IBottomSectionProps) {
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [prevBooksPerPage, setPrevBooksPerPage] = useState(10);
  const [numFound, setNumFound] = useState<number>(0);
  const [curentPage, setCurentPage] = useState(1);

  useEffect(() => {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      const url =
        BASE_URL +
        `search.json?q=${JSON.parse(
          prevSearch
        )}&author=conan%20doyle&offset=0&limit=${booksPerPage}`;
      fetchData(url);
    } else {
      fetchData(
        BASE_URL +
          `search.json?author=conan%20doyle&offset=0&limit=${booksPerPage}`
      );
    }
  }, []);

  useEffect(() => {
    const url =
      BASE_URL +
      `search.json?q=${searchQuery}&author=conan%20doyle&offset=${
        (curentPage - 1) * booksPerPage
      }&limit=${booksPerPage}`;
    fetchData(url);
    setPrevBooksPerPage(booksPerPage);
    if (prevBooksPerPage !== booksPerPage) {
      setCurentPage(1);
    }
  }, [booksPerPage, curentPage, prevBooksPerPage, searchQuery]);

  async function fetchData(url: string) {
    setIsLoading(true);

    await fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Server responds with error!');
        }
        return resp.json();
      })
      .then((result) => {
        console.log('result.docs', result.docs);
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

  const pageAmount = Math.ceil(numFound / booksPerPage);
  const pageArray: number[] = [];
  for (let i = 0; i < pageAmount; i++) {
    pageArray.push(i + 1);
  }

  const pageNumbers = pageArray.map((item, index) => {
    return (
      <li key={index} className="mx-1 number-list">
        <input
          type="radio"
          className="btn-check"
          name={`btnradio-${item}`}
          id={`btnradio-${item}`}
          value={item}
          checked={curentPage === item}
          onChange={() => {
            setCurentPage(item);
            console.log('item', item);
            console.log('curentPage', curentPage);
          }}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio-${item}`}>
          {item}
        </label>
      </li>
    );
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (books && numFound) {
    return (
      <div>
        <div className="flex-row d-flex justify-content-between fw-bolder mb-4">
          <div className="d-inline p-2 text-bg-primary rounded-2">
            Found: {numFound}
          </div>
          <ul
            role="form"
            aria-label="page-numbers"
            className="d-flex flex-row "
          >
            {pageNumbers}
          </ul>
        </div>
        <BookList books={books} />
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
