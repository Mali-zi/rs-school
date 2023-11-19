import React from 'react';
import { screen } from '@testing-library/react';
import ResultSection from './ResultSection';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../mock/store';
import { libraryApi } from '../../app/services/api';
import { BASE_URL } from '../../utils/const';
import { BrowserRouter } from 'react-router-dom';

const mockBooks = [
  { key: 'test-key-1', title: 'Xabi Alonzo' },
  { key: 'test-key-2', title: 'Lionel Messi' },
  { key: 'test-key-3', title: 'Lionel Love' },
  { key: 'test-key-4', title: 'Lionel Poe' },
  { key: 'test-key-5', title: 'Lionel Gink' },
];

const data = {
  docs: mockBooks,
};

const store = setupStore({});

const handlers = [
  http.get(BASE_URL + '/search.json', async () => {
    // successful response
    return HttpResponse.json({ data });
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

describe('ResultSection', () => {
  it('Loading is shown until the ResultSection is fetched', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ResultSection />
      </BrowserRouter>
    );
    expect(screen.findByText(/Loading.../i));
  });
});
