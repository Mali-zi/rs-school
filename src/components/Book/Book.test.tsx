import React from 'react';
import { render, screen } from '@testing-library/react';
import Book from './Book';
import { BrowserRouter } from 'react-router-dom';

const mockBook = {
  key: 'test-key',
  title: 'test-title',
};

describe('<Book />', () => {
  it('Book mounts properly', () => {
    const wrapper = render(
      <BrowserRouter>
        <Book book={mockBook} />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
    expect(screen.queryByText(/Author/)).toBeInTheDocument();
  });
});
