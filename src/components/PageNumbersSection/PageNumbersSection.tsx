import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopContext } from '../TopSection/TopSection';
import { IPageNumbersSection } from '../../models';
import { Pagination } from 'react-bootstrap';

export default function PageNumbersSection({
  numFound,
  curentPage,
  setCurentPage,
}: IPageNumbersSection) {
  const data = useContext(TopContext);
  const navigate = useNavigate();

  const pageAmount = data ? Math.ceil(numFound / data.booksPerPage) : 0;

  const items: JSX.Element[] = [];

  if (pageAmount === 1) {
    items.push(
      <Pagination.Item key="1" data-page={1} active={true}>
        {1}
      </Pagination.Item>
    );
  }

  if (pageAmount > 1) {
    if (curentPage > 1) {
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => {
            setCurentPage(curentPage - 1);
            navigate(`/${curentPage - 1}`);
          }}
        />
      );
    }

    items.push(
      <Pagination.Item
        key="1"
        data-page={1}
        active={1 === curentPage}
        onClick={() => {
          setCurentPage(1);
          navigate(`/${1}`);
        }}
      >
        {1}
      </Pagination.Item>
    );
  }

  if (pageAmount > 1 && pageAmount <= 7) {
    for (let page = 2; page <= pageAmount - 1; page++) {
      items.push(
        <Pagination.Item
          key={page}
          data-page={page}
          active={page === curentPage}
          onClick={() => {
            setCurentPage(page);
            navigate(`/${page}`);
          }}
        >
          {page}
        </Pagination.Item>
      );
    }
  }

  if (pageAmount >= 8) {
    if (curentPage <= 2) {
      for (let page = 2; page <= 3; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            active={page === curentPage}
            onClick={() => {
              setCurentPage(page);
              navigate(`/${page}`);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key="ind-1" />);
    }

    if (curentPage >= 3 && curentPage <= 4) {
      for (let page = 2; page <= curentPage + 1; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            active={page === curentPage}
            onClick={() => {
              setCurentPage(page);
              navigate(`/${page}`);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key="ind-2" />);
    }

    if (curentPage >= 5 && curentPage <= pageAmount - 4) {
      items.push(<Pagination.Ellipsis key="ind-3" />);
      for (let page = curentPage - 1; page <= curentPage + 1; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            active={page === curentPage}
            onClick={() => {
              setCurentPage(page);
              navigate(`/${page}`);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key="ind-4" />);
    }

    if (curentPage <= pageAmount - 2 && curentPage >= pageAmount - 3) {
      items.push(<Pagination.Ellipsis key="ind-5" />);
      for (let page = curentPage - 1; page <= pageAmount - 1; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            active={page === curentPage}
            onClick={() => {
              setCurentPage(page);
              navigate(`/${page}`);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
    }

    if (curentPage >= pageAmount - 1) {
      items.push(<Pagination.Ellipsis key="ind-6" />);
      for (let page = pageAmount - 2; page <= pageAmount - 1; page++) {
        items.push(
          <Pagination.Item
            key={page}
            data-page={page}
            active={page === curentPage}
            onClick={() => {
              setCurentPage(page);
              navigate(`/${page}`);
            }}
          >
            {page}
          </Pagination.Item>
        );
      }
    }
  }

  if (pageAmount > 1) {
    items.push(
      <Pagination.Item
        key={pageAmount}
        data-page={pageAmount}
        active={pageAmount === curentPage}
        onClick={() => {
          setCurentPage(pageAmount);
          navigate(`/${pageAmount}`);
        }}
      >
        {pageAmount}
      </Pagination.Item>
    );
  }

  if (curentPage < pageAmount) {
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          setCurentPage(curentPage + 1);
          navigate(`/${curentPage + 1}`);
        }}
      />
    );
  }

  return (
    <div className="flex-row d-flex justify-content-end fw-bolder mb-4">
      <Pagination>{items}</Pagination>
    </div>
  );
}
