import React from 'react';
import PageNumbersSection from './PageNumbersSection';
import curentPageSlice, {
  initialState,
  setCurentPage,
} from '../../features/curentPageSlice';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('<PageNumbersSection />', () => {
  it('PageNumbersSection mounts properly', async () => {
    const wrapper = renderWithProviders(
      <BrowserRouter>
        <PageNumbersSection />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });

  it('initialize slice with initialValue', () => {
    const curentPageSliceInit = curentPageSlice(initialState, {
      type: 'unknown',
    });
    expect(curentPageSliceInit).toBe(initialState);
  });

  it('test setCurentPage', () => {
    const testData = 17;
    const afterReducerOperation = curentPageSlice(
      initialState,
      setCurentPage(testData)
    );
    expect(afterReducerOperation).toStrictEqual({ curentPage: 17 });
  });
});
