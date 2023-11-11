import React from 'react';
import TopSection from '../../components/TopSection/TopSection';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4 cover">
          <ErrorBoundary>
            <TopSection />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
