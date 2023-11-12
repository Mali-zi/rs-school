import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DetailsSection from './DetailsSection';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockBookDetails = {
  key: 'test-key',
  title: 'test-title',
};

describe('DetailsSection', () => {
  it('The detailed card component correctly displays the detailed card data', () => {
    render(
      <BrowserRouter>
        <DetailsSection bookDetails={mockBookDetails} />
      </BrowserRouter>
    );

    expect(screen.getByText(/test-key/)).toBeInTheDocument();
    expect(screen.getByText(/test-title/)).toBeInTheDocument();
  });

  it('Clicking the close button hides the component', async () => {
    const wrapper = render(
      <BrowserRouter>
        <DetailsSection bookDetails={mockBookDetails} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await waitFor(async () => {
      user.click(await screen.findByRole('button'));
    });

    await waitFor(() => {
      expect(wrapper).not.toBeInTheDocument;
    });
  });
});
