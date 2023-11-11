import { render, screen } from '@testing-library/react';
import Page404 from './Page404';

describe('Page404', () => {
  it('Page404 mounts properly', () => {
    const wrapper = render(<Page404 />);
    expect(wrapper).toBeTruthy();

    // Get by h2
    const h2 = wrapper.container.querySelector('h2');
    expect(h2?.textContent).toBe('Page not found');

    // Get by title using the React testing library
    const p = screen.getByText(/no such page was found/i);
    expect(p.textContent).toBeTruthy();
  });
});
