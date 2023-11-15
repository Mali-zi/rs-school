import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setCurentPage } from '../../features/curentPageSlice';

import PageNumbersSection from '../PageNumbersSection/PageNumbersSection';
import BookList from '../BookList/BookList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchBooks } from '../../features/booksSlice';

export default function ResultSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);
  const { books, numFound, fetchError, resultLoading } = useAppSelector(
    (state) => state.books
  );

  const [prevBooksPerPage, setPrevBooksPerPage] = useState(10);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  useEffect(() => {
    if (prevBooksPerPage !== booksPerPage || searchQuery !== prevSearchQuery) {
      dispatch(setCurentPage(1));
      dispatch(fetchBooks({ searchQuery, curentPage: 1, booksPerPage }));
      navigate('/1');
      console.log('curentPage1', curentPage);
    } else {
      dispatch(fetchBooks({ searchQuery, curentPage, booksPerPage }));
      navigate(`/${curentPage}`);
      console.log('curentPage2', curentPage);
    }
    setPrevBooksPerPage(booksPerPage);
    setPrevSearchQuery(searchQuery);
    console.log('curentPage3', curentPage);
  }, [searchQuery, booksPerPage, curentPage]);

  if (fetchError) {
    return <h2>Error: {fetchError.toString()}</h2>;
  }

  if (resultLoading) {
    return <h2>Loading...</h2>;
  } else {
    if (books && numFound) {
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
