import React from 'react';
import { useAppSelector } from '../app/hooks';
import Profile from './Profile';

export default function ProfileList() {
  const profileList = useAppSelector((state) => state.data.profileList);

  return (
    <div className="row">
      <div className="col">
        <ul className="row row-cols-1 row-cols-sm-2 g-4">
          {profileList.map((profile, index) => (
            <li key={index}>
              <Profile profile={profile} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
