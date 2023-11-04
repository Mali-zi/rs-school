import React from 'react';
import { IBook, IBookList } from '../models/index';
import Book from './Book';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function BookList() {

  const list = books.map((book) => (
    <Link key={book.key} to={book.key}>
      <li key={book.key}>
        <Book book={book} />
      </li>
    </Link>
  ));

  return (
    <div>
      <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {list}
      </ul>
    </div>
  );
}
