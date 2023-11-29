import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Main() {
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col m-4">
          Main
          <Outlet />
        </div>
      </div>
    </div>
  );
}
