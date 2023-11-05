import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBookDetails } from '../models';
import { BASE_URL } from '../utils/const';
import { useOutsideClick } from '../hooks/useOutsideClick';

export default function BookDetails() {
  const ref = useOutsideClick(() => {
    goHome();
  });

  const initBookDetails = {
    key: '',
    title: '',
  };

  const [bookDetails, setBookDetails] = useState<IBookDetails>(initBookDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const { key } = useParams();
  const navigate = useNavigate();

  const goHome = () => navigate(-1);

  async function fetchData(url: string) {
    setIsLoading(true);

    await fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Server responds with error!');
        }
        return resp.json();
      })
      .then((result) => {
        setBookDetails(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (key) {
      const url = BASE_URL + `works/${key}.json`;
      fetchData(url);
    }
  }, [key]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (bookDetails) {
    return (
      <div className="col">
        <div ref={ref} className="card w-100 open-card">
          <div className="card-body">
            {bookDetails && bookDetails.covers ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${String(
                  bookDetails.covers[0]
                )}-L.jpg`}
                className="card-img-top"
                alt="cover"
              />
            ) : (
              <h5 className="card-title text-danger">
                Sorry, the book cover was not provided
              </h5>
            )}
            <h5 className="card-title">
              {bookDetails.title ? bookDetails.title : ' unspecified'}
            </h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Key: {key}
            </h6>
            <div className="card-body text-dark">
              <button
                type="button"
                className="btn btn-primary"
                onClick={goHome}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h2> Nothing found, try again! </h2>;
  }
}
