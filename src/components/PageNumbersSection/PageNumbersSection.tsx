import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurentPage } from '../../features/curentPageSlice';
import { useGetBooksQuery } from '../../app/services/api';
import { useNavigate } from 'react-router-dom';

export default function PageNumbersSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booksPerPage = useAppSelector(
    (state) => state.booksPerPage.selectedNumber
  );
  const curentPage = useAppSelector((state) => state.curentPage.curentPage);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const { data } = useGetBooksQuery({
    searchQuery,
    curentPage,
    booksPerPage,
  });

  const pageAmount = data ? Math.ceil(data.numFound / booksPerPage) : null;
  const pageArray: number[] = [];

  if (pageAmount) {
    for (let i = 0; i < pageAmount; i++) {
      pageArray.push(i + 1);
    }
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
            navigate(`/${item}`);
          }}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio-${item}`}>
          {item}
        </label>
      </li>
    );
  });

  if (data) {
    return (
      <div className="flex-row d-flex justify-content-between fw-bolder mb-4">
        <div className="d-inline p-2 text-bg-primary rounded-2">
          Found: {data.numFound}
        </div>
        <ul
          role="form"
          aria-label="page-numbers"
          className="d-flex flex-row flex-wrap"
        >
          {pageNumbers}
        </ul>{' '}
      </div>
    );
  } else {
    return <></>;
  }
}
