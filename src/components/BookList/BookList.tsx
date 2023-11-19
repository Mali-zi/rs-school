import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';
import { useAppSelector } from '../../app/hooks';
import { libraryApi } from '../../app/services/api';

export default function BookList() {
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const { data } = libraryApi.useGetBooksQuery({
    searchQuery,
    curentPage,
    booksPerPage,
  });

  if (data) {
    return (
      <div className="col">
        <p>Hello!</p>
        <ul className="row row-cols-1 row-cols-sm-2 g-4">
          {data.docs.map((book) => (
            <li key={book.key} data-testid="list-item">
              <Link key={book.key} to={`/${curentPage}${book.key}`}>
                <Book book={book} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>Any data was not found</p>;
  }
}
