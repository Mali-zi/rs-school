import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
