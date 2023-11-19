import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import DetailsSection from './DetailsSection';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../utils/test-utils';
import { setupStore } from '../../mock/store';
import { libraryApi } from '../../app/services/api';
import { BASE_URL } from '../../utils/const';

const mockBookDetails = {
  key: 'test-key',
  title: 'test-title',
};

const store = setupStore({});

const handlers = [
  http.get(BASE_URL + '/works/test-key.json', async () => {
    return HttpResponse.json(mockBookDetails);
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

describe('DetailsSection', () => {
  it('The detailed card component correctly displays the detailed card data', () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailsSection bookDetails={mockBookDetails} />
      </BrowserRouter>
    );
    server.use();
    expect(screen.getByText(/test-key/)).toBeInTheDocument();
    expect(screen.getByText(/test-title/)).toBeInTheDocument();
  });

  it('Clicking the close button hides the component', async () => {
    const wrapper = renderWithProviders(
      <BrowserRouter>
        <DetailsSection bookDetails={mockBookDetails} />
      </BrowserRouter>
    );
    server.use();

    const user = userEvent.setup();
    await waitFor(async () => {
      user.click(await screen.findByRole('button'));
    });

    await waitFor(() => {
      expect(wrapper).not.toBeInTheDocument;
    });
  });
});
