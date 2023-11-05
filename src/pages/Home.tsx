import React, { createContext } from 'react';
import TopSection from '../components/TopSection';
import ErrorBoundary from '../components/ErrorBoundary';
import { ITopContext } from '../models';

export const TopContext = createContext<ITopContext | null>(null);

export default function Main() {
  const fetchLocalStorage = () => {
    const prevSearch = localStorage.getItem('search');
    if (prevSearch) {
      return JSON.parse(prevSearch);
    } else {
      return '';
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4 cover">
          <ErrorBoundary>
            <TopContext.Provider
              value={{ searchQuery: fetchLocalStorage(), booksPerPage: 10 }}
            >
              <TopSection />
            </TopContext.Provider>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
