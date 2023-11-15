import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailsSection from './DetailsSection';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDetails } from '../../features/detailsSlice';

export default function BookDetails() {
  const dispatch = useAppDispatch();
  const { bookDetails, detailsError, detailsLoading } = useAppSelector(
    (state) => state.details
  );

  const { key } = useParams();

  useEffect(() => {
    if (key) {
      dispatch(fetchDetails(key));
    }
  }, [key]);

  if (detailsError) {
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
