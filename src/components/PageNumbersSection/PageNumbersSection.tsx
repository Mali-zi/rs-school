import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurentPage } from '../../features/curentPageSlice';

export default function PageNumbersSection() {
  const dispatch = useAppDispatch();
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);
  const numFound = useAppSelector((state) => state.books.numFound);

  const pageAmount = Math.ceil(numFound / booksPerPage);
  const pageArray: number[] = [];
  for (let i = 0; i < pageAmount; i++) {
    pageArray.push(i + 1);
  }

  const pageNumbers = pageArray.map((item, index) => {
    return (
      <li key={index} className="mx-1 number-list">
        <input
          type="radio"
          className="btn-check"
          name={`btnradio-${item}`}
          id={`btnradio-${item}`}
          value={item}
          checked={curentPage === item}
          onChange={() => {
            dispatch(setCurentPage(item));
          }}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio-${item}`}>
          {item}
        </label>
      </li>
    );
  });

  return (
    <div className="flex-row d-flex justify-content-between fw-bolder mb-4">
      <div className="d-inline p-2 text-bg-primary rounded-2">
        Found: {numFound}
      </div>
      <ul
        role="form"
        aria-label="page-numbers"
        className="d-flex flex-row flex-wrap"
      >
        {pageNumbers}
      </ul>
    </div>
  );
}
