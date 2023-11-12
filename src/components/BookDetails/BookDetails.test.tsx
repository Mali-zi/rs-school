import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BookDetails from './BookDetails';
import { BrowserRouter } from 'react-router-dom';

describe('BookDetails', () => {
  it('Loading is shown until the BookDetails is fetched', async () => {
    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });
  });
});
