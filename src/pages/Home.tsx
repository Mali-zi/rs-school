import React from 'react';
import TopSection from '../components/TopSection';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Main() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          <ErrorBoundary>
            <TopSection />
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
