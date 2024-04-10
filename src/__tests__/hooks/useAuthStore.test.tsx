import { configureStore } from '@reduxjs/toolkit';
import { AuthState, authSlice } from '../../store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../hooks';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../api';

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
  beforeEach(() => {
    localStorage.clear();
  });

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

  describe('#startLogin', () => {
    test('should do the login', async() => {
      const mockStore = getMockStore({...notAuthenticatedState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });

      await act(async() => {
        await result.current.startLogin(testUserCredentials);
      });

      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user}).toEqual({
        errorMessage: '',
        status: 'authenticated',
        user: { name: 'Test User', uid: '6614d7017986a282ff501efe' }
      });

      expect(localStorage.getItem('token')).toEqual(expect.any(String));
      expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    test('should fail doing the authentication', async() => {
      const mockStore = getMockStore({...notAuthenticatedState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });

      await act(async() => {
        await result.current.startLogin({ email: 'not-user@gmail.com', password: '123456'});
      });

      const { errorMessage, status, user } = result.current;
      expect(localStorage.getItem('token')).toBeNull();
      expect({errorMessage, status, user}).toEqual({
        errorMessage: 'Not valid credentials',
        status: 'not-authenticated',
        user: {}
      });

      await waitFor(() => expect(result.current.errorMessage).toBe(''))
    });
  });

  describe('#startRegister', () => {
    test('should create a user', async() => {
      const newUser = { email: 'not-user@gmail.com', password: '123456', name: 'Test User 2' };
      const mockStore = getMockStore({...notAuthenticatedState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });

      const spy = vi.spyOn(calendarApi, 'post').mockReturnValue(
        Promise.resolve({
          data: {
            ok: true,
            uid: '123',
            name: 'Test User 2',
            token: 'ABC',
          }
        })
      );

      await act(async() => {
        await result.current.startRegister(newUser);
      });

      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
        errorMessage: '',
        status: 'authenticated',
        user: { name: 'Test User 2', uid: '123' }
      });

      spy.mockRestore();
    });

    test('should fail the authentication', async() => {
      const mockStore = getMockStore({...notAuthenticatedState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });

      await act(async() => {
        await result.current.startRegister(testUserCredentials);
      });

      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
        errorMessage: 'User already exists.',
        status: 'not-authenticated',
        user: {}
      });
    });
  });

  describe('#checkAuthToken', () => {
    test('should fail if no token', async() => {
      const mockStore = getMockStore({...initialState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });

      await act(async() => {
        await result.current.checkAuthToken()
      });

      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
        errorMessage: '',
        status: 'not-authenticated',
        user: {}
      })
    });

    test('should authenticate the user', async() => {
      const { data } = await calendarApi.post('/auth', testUserCredentials);
      localStorage.setItem('token', data.token);

      const mockStore = getMockStore({...notAuthenticatedState});
      const { result } = renderHook(() => useAuthStore(), {
        wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
      });


      await act(async() => {
        await result.current.checkAuthToken();
      });

      const { errorMessage, status, user } = result.current;
      expect({ errorMessage, status, user }).toEqual({
        errorMessage: '',
        status: 'authenticated',
        user: { name: 'Test User', uid: '6614d7017986a282ff501efe' }
      })
    });
  });
});
