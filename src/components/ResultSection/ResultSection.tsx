import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PageNumbersSection from '../PageNumbersSection/PageNumbersSection';
import BookList from '../BookList/BookList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { libraryApi } from '../../app/services/api';
import { setCurentPage } from '../../features/curentPageSlice';
import { setLoading, setFetching } from '../../features/loadingSlice';

export default function ResultSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);

  const {
    data,
    isLoading: resultLoading,
    isFetching,
    isError,
  } = libraryApi.useGetBooksQuery({
    searchQuery,
    curentPage,
    booksPerPage,
  });

  useEffect(() => {
    navigate('/1');
    dispatch(setCurentPage(1));
  }, [booksPerPage, searchQuery]);

  useEffect(() => {
    dispatch(setLoading(resultLoading));
  }, [resultLoading]);

  useEffect(() => {
    dispatch(setFetching(isFetching));
  }, [isFetching]);

  if (isError) {
    return <h2>Oops! Something went wrong!</h2>;
  }

  if (resultLoading || isFetching) {
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
