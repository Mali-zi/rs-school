import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen } from '@testing-library/react';
import TopSection from './TopSection';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';

afterEach(cleanup);

describe('TopSection', () => {
  it('Display the correct number of options', () => {
    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('option').length).toBe(5);
  });

  it('Display the text input', async () => {
    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>,
      {
        preloadedState: {
          search: { searchQuery: '' },
          curentPage: { curentPage: 1 },
          booksPerPage: { selectedNumber: 10 },
        },
      }
    );
    screen.getByTestId('searchbox');
  });

  it('Display the default value 10', () => {
    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>,
      {
        preloadedState: {
          search: { searchQuery: '' },
          curentPage: { curentPage: 1 },
          booksPerPage: { selectedNumber: 10 },
        },
      }
    );
    expect(screen.getByTestId(/selectedNumber/i)).toHaveValue('10');
  });

  it('Allow user to change item number per page', () => {
    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>,
      {
        preloadedState: {
          search: { searchQuery: '' },
          curentPage: { curentPage: 1 },
          booksPerPage: { selectedNumber: 10 },
        },
      }
    );
    userEvent.selectOptions(screen.getByRole('combobox'), '20');
    const selectedNum = screen.getByText('20') as HTMLInputElement;
    expect(selectedNum.value).toBe('20');

    const selectedOption = screen.getByText(/20/i);
    const numSelect = screen.getByTestId(/selectedNumber/i);
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      numSelect,
      // Find and select 20, like a real user would.
      [selectedOption]
    );
  });

  it('The form is sent with the correct input values', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>,
      {
        preloadedState: {
          search: { searchQuery: '' },
          curentPage: { curentPage: 1 },
          booksPerPage: { selectedNumber: 10 },
        },
      }
    );

    const inputElement: HTMLInputElement = screen.getByTestId('searchbox');
    await user.clear(inputElement);
    await user.type(inputElement, 'hello');
    expect(inputElement.value).toBe('hello');
    await user.click(screen.getByTestId('submitButton'));
    expect(screen.getByText('Form submitted')).toBeInTheDocument();
  });

  it('Empty searchbox error shown', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <BrowserRouter>
        <TopSection />
      </BrowserRouter>,
      {
        preloadedState: {
          search: { searchQuery: '' },
          curentPage: { curentPage: 1 },
          booksPerPage: { selectedNumber: 10 },
        },
      }
    );
    const inputElement: HTMLInputElement = screen.getByTestId('searchbox');

    await user.clear(inputElement);
    await user.click(screen.getByTestId('submitButton'));
    expect(screen.getByText(/The query isn't valid/i)).toBeInTheDocument();
  });
});
