import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BookDetails from './BookDetails';
import { BrowserRouter } from 'react-router-dom';
import * as services from '../../utils/services';

const mockBookDetails = {
  key: 'test-key',
  title: 'test-title',
};

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

  it('An additional API call to fetch detailed information', async () => {
    const mockFetchData = vi
      .spyOn(services, 'getData')
      .mockImplementation(async () => {
        return mockBookDetails;
      });

    render(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );
    expect(mockFetchData).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText(/test-key/i)).toBeInTheDocument();
    });
  });
});
