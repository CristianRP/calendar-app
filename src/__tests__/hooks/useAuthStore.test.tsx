import { configureStore } from '@reduxjs/toolkit';
import { AuthState, authSlice } from '../../store';
import { initialState } from '../fixtures/authStates';
import { renderHook } from '@testing-library/react';
import { useAuthStore } from '../../hooks';
import { Provider } from 'react-redux';

const getMockStore = (initialState: AuthState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}

describe('Tests on useAuthStore', () => {
  test('should return the default values)', () => {
    const mockStore = getMockStore(initialState);
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    })
  });
});
