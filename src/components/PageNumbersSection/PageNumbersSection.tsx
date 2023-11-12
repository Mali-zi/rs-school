import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopContext } from '../TopSection/TopSection';
import { IPageNumbersSection } from '../../models';

export default function PageNumbersSection({
  numFound,
  curentPage,
  setCurentPage,
}: IPageNumbersSection) {
  const data = useContext(TopContext);
  const navigate = useNavigate();

  const pageAmount = data ? Math.ceil(numFound / data.booksPerPage) : 0;
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
            setCurentPage(item);
            navigate(`/${item}`);
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
