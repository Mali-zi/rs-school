import React, { useCallback, useContext } from 'react';
import { ResultContext } from '../ResultSection/ResultSection';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';

export default function BookList() {
  const data = useContext(ResultContext);

  const rendList = useCallback(() => {
    const list = data.books.map((book) => (
      <li key={book.key}>
        <div className="card border-dark mb-3 h-100 card-style">
          <Link key={book.key} to={`/${data.curentPage}${book.key}`}>
            <div className="card-header fs-6 mt-2">Key: {book.key}</div>
          </Link>
          <Book book={book} />
        </div>
      </li>
    ));

    return list;
  }, [data.books]);

  return (
    <div className="col">
      <ul className="row row-cols-1 row-cols-sm-2 g-4">{rendList()}</ul>
    </div>
  );
}
