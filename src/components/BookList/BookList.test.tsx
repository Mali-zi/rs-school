import { render, screen } from '@testing-library/react';
import BookList from './BookList';

describe('BookList', () => {
  it('BookList mounts properly', () => {
    const wrapper = render(<BookList />);
    expect(wrapper).toBeTruthy();
  });

  it('Booklist has a list', () => {
    render(<BookList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
