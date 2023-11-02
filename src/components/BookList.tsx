import React, { useState } from 'react';
import { IBookListProps } from '../models/index';
import Book from './Book';

export default function BookList({ books, booksPerPage }: IBookListProps) {
  const [curentPage, setCurentPage] = useState(1);
  const pageAmount = Math.ceil(books.length / booksPerPage);
  const pageArray: number[] = [];
  for (let i = 0; i < pageAmount; i++) {
    pageArray.push(i + 1);
  }

  const list = books
    .slice((curentPage - 1) * booksPerPage, curentPage * booksPerPage)
    .map((book) => (
      <li key={book.key}>
        <Book book={book} />
      </li>
    ));

  const pageNumbers = pageArray.map((item, index) => {
    return (
      <li key={index} className="mx-1 number-list">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setCurentPage(item)}
        >
          {item}
        </button>
      </li>
    );
  });

  return (
    <div>
      <div className="flex-row d-flex justify-content-between fw-bolder mb-4">
        <div className="d-inline p-2 text-bg-primary rounded-2">
          Found: {books.length}
        </div>
        <ul className="d-flex flex-row">{pageNumbers}</ul>
      </div>
      <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {list}
      </ul>
    </div>
  );
}
