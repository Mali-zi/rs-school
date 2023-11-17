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

  const list = data?.docs.map((book) => (
    <li key={book.key}>
      <Link key={book.key} to={`/${curentPage}${book.key}`}>
        <Book book={book} />
      </Link>
    </li>
  ));

  if (data) {
    return (
      <div className="col">
        <ul className="row row-cols-1 row-cols-sm-2 g-4">{list}</ul>
      </div>
    );
  } else {
    return <></>;
  }
}
