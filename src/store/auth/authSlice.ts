import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type User = {
  name: string;
  email: string;
  password: string;
}

type AuthState = {
  status: AuthStatus;
  user: User;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'checking',
  user: {} as User,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {} as User;
      state.errorMessage = '';
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = '';
    }
  }
});
       
export const { onChecking, onLogin } = authSlice.actions;
