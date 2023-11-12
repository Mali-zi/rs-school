import React from 'react';
import { render } from '@testing-library/react';
import PageNumbersSection from './PageNumbersSection';
import { BrowserRouter } from 'react-router-dom';

describe('<PageNumbersSection />', () => {
  it('PageNumbersSection mounts properly', () => {
    const wrapper = render(
      <BrowserRouter>
        <PageNumbersSection numFound={175} curentPage={1} />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
