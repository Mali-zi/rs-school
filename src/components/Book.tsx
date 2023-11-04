import React from 'react';
import { IBookProps } from '../models';

export default function Book({ book }: IBookProps) {
  const {
    key,
    title,
    author_name,
    publisher,
    publish_place,
    publish_year,
    ebook_access,
  } = book;

  const shortField = (value: string) => {
    if (value.length > 50) {
      return value.substring(0, 50) + '...';
    } else {
      return value;
    }
  };

  console.log('key in Book', key);

  return (
    <div className="card border-dark mb-3 h-100 card-style">
      <div className="card-header fs-4">
        <div className="author-name">{shortField(title)}</div>
        {author_name && (
          <div className="fs-6 text-dark-emphasis mt-2">
            Author: Arthur Conan Doyle
          </div>
        )}
      </div>
      <div className="card-body text-dark">
        <ul className="list-group list-group-flush">
          {publisher && (
            <li className="list-group-item">
              publisher: {shortField(publisher[0])}
            </li>
          )}
          {publish_place && (
            <li className="list-group-item">
              publish place: {shortField(publish_place[0])}
            </li>
          )}
          {publish_year && (
            <li className="list-group-item">publish year: {publish_year[0]}</li>
          )}
          <li className="list-group-item">ebook: {shortField(ebook_access)}</li>
        </ul>
      </div>
    </div>
  );
}
