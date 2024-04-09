import { renderHook } from '@testing-library/react';
import { useUiStore } from '../../hooks';
import { Provider } from 'react-redux';
import { uiSlice } from '../../store';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const getMockStore = (initialState: { isDateModalOpen: boolean}) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}

describe('Tests on useUiStore', () => {
  test('should return the default values', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    })
  });

  test('openModal should set true on isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    }); 

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    })

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeModal should set false on isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    }); 

    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    })

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});