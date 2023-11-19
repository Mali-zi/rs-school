import { screen, waitFor } from '@testing-library/react';
import BookList from './BookList';
import { renderWithProviders } from '../../utils/test-utils';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
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
  numFound: 5,
  docs: mockBooks,
};

const store = setupStore({});

const handlers = [
  http.get(BASE_URL + `/*`, async ({}) => {
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

describe('BookList', () => {
  it('BookList mounts properly', async () => {
    const wrapper = renderWithProviders(<BookList />);

    expect(wrapper).toBeTruthy();
  });

  it('Booklist has a list', async () => {
    renderWithProviders(
      <BrowserRouter>
        <BookList />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.findByTestId('list-item')));
  });
});
