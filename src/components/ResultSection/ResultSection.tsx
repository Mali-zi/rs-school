import React from 'react';
import { Outlet } from 'react-router-dom';

import PageNumbersSection from '../PageNumbersSection/PageNumbersSection';
import BookList from '../BookList/BookList';
import { useAppSelector } from '../../app/hooks';
import { libraryApi } from '../../app/services/api';

export default function ResultSection() {
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);

  const {
    data,
    isLoading: resultLoading,
    isError,
    error: fetchError,
  } = libraryApi.useGetBooksQuery({
    searchQuery,
    curentPage,
    booksPerPage,
  });

  if (isError) {
    return <h2>Error: {fetchError.toString()}</h2>;
  }

  if (resultLoading) {
    return <h2>Loading...</h2>;
  } else {
    if (data && data.docs && data.numFound) {
      return (
        <div>
          <PageNumbersSection />
          <div className="row">
            <BookList />
            <Outlet />
          </div>
        </div>
      );
    } else {
      return <h2> Nothing found! </h2>;
    }
  }
}
