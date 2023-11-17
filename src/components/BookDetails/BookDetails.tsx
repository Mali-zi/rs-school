import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsSection from './DetailsSection';
import { libraryApi } from '../../app/services/api';
import { skipToken } from '@reduxjs/toolkit/query/react';

export default function BookDetails() {
  const { key } = useParams();

  const {
    data: bookDetails,
    isLoading: detailsLoading,
    isError,
    error: detailsError,
  } = libraryApi.useGetDetailsQuery(key ?? skipToken);

  // useEffect(() => {
  //   if (key) {
  //     dispatch(fetchDetails(key));
  //   }
  // }, [key]);

  if (isError) {
    return <h2>Error: {detailsError.toString()}</h2>;
  }

  if (detailsLoading) {
    return (
      <div className="col">
        <h2 data-testid="loading">Loading...</h2>
      </div>
    );
  } else {
    if (bookDetails) {
      return (
        <div className="col">
          <DetailsSection bookDetails={bookDetails} />
        </div>
      );
    } else {
      return (
        <div className="col">
          <h2> Nothing found, try again! </h2>
        </div>
      );
    }
  }
}
