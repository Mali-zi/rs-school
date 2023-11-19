import React from 'react';
import { describe, expect } from 'vitest';
import App from './App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('<App />', () => {
  it('App mounts properly', () => {
    const wrapper = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });

  it('Page404 is displayed when navigating to an invalid route', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
