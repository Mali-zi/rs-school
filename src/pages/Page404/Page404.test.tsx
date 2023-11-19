import { screen } from '@testing-library/react';
import Page404 from './Page404';
import { renderWithProviders } from '../../utils/test-utils';

describe('Page404', () => {
  it('Page404 mounts properly', () => {
    renderWithProviders(<Page404 />);

    screen.findByRole('heading', { name: /Page not found/i });
    screen.getByText(/no such page was found/i);
  });
});
