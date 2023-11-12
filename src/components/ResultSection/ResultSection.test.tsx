import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ResultSection from './ResultSection';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as services from '../../utils/services';

describe('ResultSection', () => {
  it('ResultSection mounts properly', () => {
    const wrapper = render(
      <BrowserRouter>
        <ResultSection />
      </BrowserRouter>
    );

    expect(wrapper).toBeTruthy();
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    const mockFetchData = vi
      .spyOn(services, 'getData')
      .mockImplementation(async () => {
        return [];
      });

    render(
      <BrowserRouter>
        <ResultSection />
      </BrowserRouter>
    );

    expect(mockFetchData).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
    });
  });
});
