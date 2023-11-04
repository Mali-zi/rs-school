import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBookDetails } from '../models';
import { BASE_URL } from '../utils/utils';

export default function BookDetails() {
  const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const { key } = useParams();
  const navigate = useNavigate();

  const goHome = () => navigate('/');

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
      <div>
        <p>Author: Arthur Conan Doyle</p>
        {key}
        <p>covers: {bookDetails.covers[0]}</p>
        <p>title: {bookDetails.title}</p>
        <p>first_publish_date: {bookDetails.first_publish_date}</p>
        {bookDetails.links && <p>links: {bookDetails.links[0].url}</p>}
        <button type="button" onClick={goHome}>
          go back
        </button>
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
