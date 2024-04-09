import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../store';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Tests on authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('should do the login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: '',
    })
  });

  test('should do the logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout(''));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: '',
    })
  });

  test('should do the logout with errorMessage', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage,
    })
  });

  test('should clearErrorMessage', () => {
    const errorMessage = 'Invalid credentials';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe('');
  });
});