import { render, screen } from '@testing-library/react';
import BookList from './BookList';
import '@testing-library/jest-dom';
import { ResultContext } from '../ResultSection/ResultSection';
import { BrowserRouter } from 'react-router-dom';

const books = [
  {
    key: '/test-key-1',
    title: 'test-title-1',
  },
  {
    key: '/test-key-2',
    title: 'test-title-2',
  },
  {
    key: '/test-key-3',
    title: 'test-title-3',
  },
];

const curentPage = 1;

describe('BookList', () => {
  it('BookList mounts properly', () => {
    const wrapper = render(<BookList />);
    expect(wrapper).toBeTruthy();
  });

  it('Booklist has a list', () => {
    render(<BookList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('BookList component renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <ResultContext.Provider value={{ books, curentPage }}>
          <BookList />
        </ResultContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/^test-title-1/).textContent).toBe('test-title-1');
    expect(screen.getAllByText(/key/)).toHaveLength(3);
  });
});
