import React, { useContext } from 'react';
import { ResultContext } from './ResultSection';
import { Link } from 'react-router-dom';
import Book from './Book';

export default function BookList() {
  const data = useContext(ResultContext);
  return (
    <div className="col">
      <ul className="row row-cols-1 row-cols-sm-2 g-4">
        {data.books.map((book) => (
          <li key={book.key}>
            <Link key={book.key} to={`/${data.curentPage}${book.key}`}>
              <Book book={book} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
