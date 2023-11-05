import React from 'react';
import { IBookProps } from '../models';

export default function Book({ book }: IBookProps) {
  const { title, publisher, publish_place, publish_year, ebook_access } = book;

  const shortField = (value: string) => {
    if (value) {
      if (value.length > 50) {
        return value.substring(0, 50) + '...';
      } else {
        return value;
      }
    } else {
      return 'unspecified';
    }
  };

  return (
    <div className="card border-dark mb-3 h-100 card-style">
      <div className="card-header fs-4">
        <div className="author-name">
          {title ? shortField(title) : 'unspecified'}
        </div>
        <div className="fs-6 text-dark-emphasis mt-2">
          Author: Arthur Conan Doyle
        </div>
      </div>
      <div className="card-body text-dark">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            publisher: {publisher ? shortField(publisher[0]) : 'unspecified'}
          </li>
          <li className="list-group-item">
            publish place:{' '}
            {publish_place ? shortField(publish_place[0]) : 'unspecified'}
          </li>
          <li className="list-group-item">
            publish year: {publish_year ? publish_year[0] : 'unspecified'}
          </li>
          <li className="list-group-item">
            ebook: {ebook_access ? shortField(ebook_access) : 'unspecified'}
          </li>
        </ul>
      </div>
    </div>
  );
}
