import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';
import { useAppSelector } from '../../app/hooks';

export default function BookList() {
  const books = useAppSelector((state) => state.books.books);
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);

  const rendList = useCallback(() => {
    const list = books.map((book) => (
      <li key={book.key}>
        <Link key={book.key} to={`/${curentPage}${book.key}`}>
          <Book book={book} />
        </Link>
      </li>
    ));

    return list;
  }, [books]);

  return (
    <div className="col">
      <ul className="row row-cols-1 row-cols-sm-2 g-4">{rendList()}</ul>
    </div>
  );
}
