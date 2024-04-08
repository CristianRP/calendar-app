import { FormEvent, useEffect } from 'react'
import { FormValidations, useAuthStore, useForm } from '../../hooks'
import Swal from 'sweetalert2'

type LoginFormValidations = {
  loginEmail: [() => boolean, string],
  loginPassword: [() => boolean, string],
}

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

const loginFormValidations: FormValidations<LoginFormValidations> = {
  loginEmail: [() => true, ''],
  loginPassword: [() => true, ''],
}

type RegisterFormValidations = {
  registerName: [() => boolean, string],
  registerEmail: [() => boolean, string],
  registerPassword: [() => boolean, string],
  registerConfirmPassword: [() => boolean, string],
}

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
}

const registerFormValidations: FormValidations<RegisterFormValidations> = {
  registerName: [() => true, ''],
  registerEmail: [() => true, ''],
  registerPassword: [(value) => value.length > 0, 'Password is required'],
  registerConfirmPassword: [(value) => value.length > 0, 'Confirmation Password is required'],
}

export const LoginPage = () => {

  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields, loginFormValidations);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
    onInputChange:onRegisterInputChange,
    registerPasswordValid,
    registerConfirmPasswordValid,
  } = useForm(registerFormFields, registerFormValidations);

  const onSubmitLogin = (event: FormEvent) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const onSubmitRegister = (event: FormEvent) => {
    event.preventDefault();

    if (registerPassword !== registerConfirmPassword) {
      Swal.fire('Register error', 'Password and Confirm Password are not equal', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword
    });
  }

  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Authentication Error!', errorMessage, 'error');
    }
  }, [errorMessage])

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2 ">
          <div className='rounded-lg shadow-lg bg-white p-6 h-full flex flex-col justify-center'>
            <h3 className='text-center text-gray-700 text-2xl font-semibold pt-6'>Login</h3>
            <form onSubmit={ onSubmitLogin } className='p-12'>
              <div className="mb-4">
                <input
                  className='w-full rounded-lg'
                  type="text"
                  placeholder='Email'
                  name='loginEmail'
                  value={ loginEmail }
                  onChange={ onLoginInputChange }
                />
              </div>
              <div className="mb-4">
                <input
                  className='w-full rounded-lg'
                  type="password"
                  placeholder='Password'
                  name="loginPassword"
                  value={ loginPassword }
                  onChange={ onLoginInputChange }
                />
              </div>
              <div className="mb-4">
                <input
                  className='w-1/2 mt-2 px-4 py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-400 cursor-pointer'
                  type="submit"
                  value="Login" />
              </div>
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2 ">
          <div className='rounded-lg shadow-2xl p-6 bg-gradient-to-r from-cyan-500 to-blue-500'>
            <h3 className='text-2xl text-white text-center font-semibold pt-6'>Register</h3>
            <form onSubmit={ onSubmitRegister } className='p-12'>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                  type="text"
                  name="registerName"
                  placeholder='Name'
                  value={ registerName }
                  onChange={ onRegisterInputChange }
                  id="name" />
              </div>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                    type="email"
                    name="registerEmail"
                    placeholder='Email'
                    value={ registerEmail }
                    onChange={ onRegisterInputChange }
                    id="email" />
              </div>
              <div className="w-full mb-4">
                <input
                  className={`w-full rounded-lg ${registerPasswordValid === '' ? '' : 'ring-1 ring-red-600 focus:ring-1 focus:ring-red-600'}`}
                  type="password"
                  name="registerPassword"
                  placeholder='Password'
                  value={ registerPassword }
                  onChange={ onRegisterInputChange }
                  id="password" />
              </div>
              <div className="w-full mb-4">
                <input
                  className={`w-full rounded-lg ${registerConfirmPasswordValid === '' ? '' : 'ring-1 ring-red-600 focus:ring-1 focus:ring-red-600'}`}
                  type="password"
                  name="registerConfirmPassword"
                  value={ registerConfirmPassword }
                  onChange={ onRegisterInputChange }
                  placeholder='Confirm Password'
                  id="confirm-password" />
              </div>
              <div className="w-full mb-4">
                <input
                  type="submit"
                  className='w-1/1.5 mt-2 px-4 py-2 bg-white text-blue-700 rounded-2xl hover:bg-slate-100 focus:outline-none focus:bg-white focus:ring focus:ring-blue-400 cursor-pointer'
                  value="Create Account" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

