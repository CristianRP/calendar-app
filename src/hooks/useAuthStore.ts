import { AxiosError } from 'axios';
import { calendarApi } from '../api';
import { User, clearErrorMessage, onChecking, onLogin, onLogout, useAppDispatch, useAppSelector } from '../store';

type AxiosErrorResponse = {
  data: {
    msg?: string;
    errors: [
      {
        msg: string;
      }
    ];
  }
}

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async({ email, password }: User) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch(error) {
      dispatch(onLogout('Not valid credentials'))
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const startRegister = async({ name, email, password, confirmPassword }: User) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password, confirmPassword });
      console.log(data);
    } catch(error) {
      const axiosError = error as AxiosError;
      const { data } = axiosError.response! as AxiosErrorResponse;
      let errorsToShow = ''
      if (data.errors) {
        errorsToShow = `<ul>${Object.values(data.errors).map(error => `<li>${error.msg}</li>`).join('')}</ul>`
      } else {
        errorsToShow = data.msg!;
      }

      dispatch(onLogout(errorsToShow));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout(''));

    try {
      const { data } = await calendarApi.get('/auth/renew');
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch(error) {
      localStorage.clear();
      dispatch(onLogout(''));
    } 
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(''));
  }

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  }
}
