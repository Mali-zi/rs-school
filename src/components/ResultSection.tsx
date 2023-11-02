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
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [prevBooksPerPage, setPrevBooksPerPage] = useState(10);

  useEffect(() => {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      const url =
        BASE_URL +
        `search.json?q=${JSON.parse(
          prevSearch
        )}&author=conan%20doyle&offset=0&limit=${booksPerPage * 5}`;
      fetchData(url);
    } else {
      fetchData(
        BASE_URL +
          `search.json?author=conan%20doyle&offset=0&limit=${booksPerPage * 5}`
      );
    }
  }, []);

  useEffect(() => {
    if (prevSearchQuery !== searchQuery || booksPerPage !== prevBooksPerPage) {
      const url =
        BASE_URL +
        `search.json?q=${searchQuery}&author=conan%20doyle&offset=0&limit=${
          booksPerPage * 5
        }`;
      fetchData(url);
      setPrevSearchQuery(searchQuery);
      setPrevBooksPerPage(booksPerPage);
    }
  }, [booksPerPage, prevBooksPerPage, prevSearchQuery, searchQuery]);

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

  if (books && books.length) {
    return (
      <div>
        <BookList books={books} booksPerPage={booksPerPage} />
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
