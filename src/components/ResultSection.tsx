import React, { useEffect, useState } from 'react';
import PlanetList from './BookList';
import { IBottomSectionProps, IPlanet } from '../models/index';

const BASE_URL = 'https://openlibrary.org/';

export default function ResultSection({ searchQuery }: IBottomSectionProps) {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  useEffect(() => {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      const url =
        BASE_URL + `?search=${JSON.parse(prevSearch)}&offset=0&limit=10`;
      fetchData(url);
    } else {
      fetchData(BASE_URL + `?offset=0&limit=10`);
    }
  }, []);

  useEffect(() => {
    if (prevSearchQuery !== searchQuery) {
      const url = BASE_URL + '?search=' + searchQuery + '&offset=0&limit=10';
      fetchData(url);
      setPrevSearchQuery(searchQuery);
    }
  }, [prevSearchQuery, searchQuery]);

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
        console.log('result.results', result.results);
        setPlanets(result.results);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (planets && planets.length) {
    return (
      <div>
        <PlanetList planets={planets} />
      </div>
    );
  } else {
    return <h2> Nothing found! </h2>;
  }
}
