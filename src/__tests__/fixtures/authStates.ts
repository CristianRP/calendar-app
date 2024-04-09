import { AuthState, User } from '../../store';

export const initialState: AuthState = {
  status: 'checking',
  user: {} as User,
}

export const authenticatedState: AuthState = {
  status: 'authenticated',
  user: {
    uid: 'ABC',
    name: 'Cristian'
  },
  errorMessage: '',
}

export const notAuthenticatedState: AuthState = {
  status: 'not-authenticated',
  user: {} as User,
  errorMessage: '',
}
