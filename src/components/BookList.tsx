import React from 'react';
import { IBookListProps } from '../models/index';
import Book from './Book';

export default function BookList({ books }: IBookListProps) {
  const list = books.map((book) => (
    <li key={book.key}>
      <Book book={book} />
    </li>
  ));

  return (
    <div>
      <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {list}
      </ul>
    </div>
  );
}
