import React from 'react';
import { eyeOpenIcon, eyeCrossedIcon } from '../utils/Icons';

interface IEyeProps {
  isOpen: boolean;
}

export default function Eye({ isOpen }: IEyeProps) {
  return <div>{isOpen ? eyeOpenIcon() : eyeCrossedIcon()}</div>;
}
