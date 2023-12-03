import React from 'react';

interface IInputProps {
  label: string;
  id: string;
  type: string;
}

export default function Input({ label, id, type }: IInputProps) {
  return (
    <>
      <label htmlFor={id} className="form-label fw-semibold mb-1">
        {label}
      </label>
      <input id={id} type={type} autoComplete={id} className="form-control" />
    </>
  );
}
