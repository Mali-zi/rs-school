import React, { useEffect, useState } from 'react';
import { IProfileProps } from '../utils/interfaces';

export default function Profile({ profile, index }: IProfileProps) {
  const {
    username,
    age,
    gender,
    image,
    country,
    email,
    password,
    confirmPassword,
    accept,
  } = profile;

  const [bord, setBord] = useState(
    'card border-4 border-primary mb-3 h-100 card-style'
  );

  useEffect(() => {
    if (index === 0) {
      setBord('card border-4 border-danger mb-3 h-100 card-style');
    }
    const timerId = setTimeout(() => {
      setBord('card border-4 border-primary mb-3 h-100 card-style');
    }, 2000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={bord}>
      <div className="card">
        <img src={image} className="card-img-top" alt="picture" />
        <div className="card-body text-dark">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Name: {username}</li>
            <li className="list-group-item">Age: {age}</li>
            <li className="list-group-item">Gender: {gender}</li>
            <li className="list-group-item">Country: {country}</li>
            <li className="list-group-item">Email: {email}</li>
            <li className="list-group-item">Password: {password}</li>
            <li className="list-group-item">
              Confirm Password: {confirmPassword}
            </li>
            <li className="list-group-item">Accept: {String(accept)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
