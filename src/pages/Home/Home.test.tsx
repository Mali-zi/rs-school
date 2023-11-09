import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('<Home />', () => {
  test('Home mounts properly', () => {
    const wrapper = render(<Home />);
    expect(wrapper).toBeTruthy();

    // Get by h1
    const h2 = wrapper.container.querySelector('h2');
    expect(h2?.textContent).toBe('Page not found');

    // Get by text using the React testing library
    const title = screen.getByText(/Page not found/i);
    expect(title.textContent).toBeTruthy();
  });
});
