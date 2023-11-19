import React from 'react';
import { screen } from '@testing-library/react';
import BookDetails from './BookDetails';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../mock/store';
import { libraryApi } from '../../app/services/api';
import { BASE_URL } from '../../utils/const';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore({});

const handlers = [
  http.get(BASE_URL + '/works/test-key.json', async () => {
    return HttpResponse.json({
      data: {
        key: 'test-key',
        title: 'test-title',
      },
    });
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  server.resetHandlers();
  store.dispatch(libraryApi.util.resetApiState());
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('BookDetails', () => {
  it('Loading is shown until the BookDetails is fetched', async () => {
    renderWithProviders(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );

    expect(screen.findByText(/Loading.../i));
  });

  it('An additional API call to fetch detailed information', async () => {
    renderWithProviders(
      <BrowserRouter>
        <BookDetails />
      </BrowserRouter>
    );
    expect(screen.findByText(/test-key/i));
  });
});
