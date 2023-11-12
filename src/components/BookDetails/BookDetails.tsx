import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBookDetails } from '../../models';
import { BASE_URL } from '../../utils/const';
import DetailsSection from './DetailsSection';
import { getData } from '../../utils/services';

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const { key } = useParams();

  async function fetchDetails(key: string | undefined) {
    const url = BASE_URL + `works/${key}.json`;
    setDetailsLoading(true);

    getData(url)
      .then((result) => {
        setBookDetails(result);
        setDetailsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setDetailsLoading(false);
      });
  }

  useEffect(() => {
    fetchDetails(key);
  }, []);

  if (error) {
    return <h2>Error: {error.message}</h2>;
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
