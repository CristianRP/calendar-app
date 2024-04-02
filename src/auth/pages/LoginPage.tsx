export const LoginPage = () => {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2 ">
          <div className='rounded-lg shadow-lg bg-white p-6 h-full flex flex-col justify-center'>
            <h3 className='text-center text-gray-700 text-2xl font-semibold pt-6'>Login</h3>
            <form action="" className='p-12'>
              <div className="mb-4">
                <input
                  className='w-full rounded-lg'
                  type="text"
                  placeholder='Email'
                />
              </div>
              <div className="mb-4">
                <input
                  className='w-full rounded-lg'
                  type="password"
                  placeholder='Password'
                  name="password" />
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
            <form action="" className='p-12'>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                  type="text"
                  name="Name"
                  placeholder='Name'
                  id="name" />
              </div>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                    type="email"
                    name="email"
                    placeholder='Email'
                    id="email" />
              </div>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                  type="password"
                  name="password"
                  placeholder='Password'
                  id="password" />
              </div>
              <div className="w-full mb-4">
                <input
                  className='w-full rounded-lg'
                  type="password"
                  name="confirm-password"
                  placeholder='Confirm Password'
                  id="confirm-password" />
              </div>
              <div className="w-full mb-4">
                <input
                  type="submit"
                  className='w-1/2 mt-2 px-4 py-2 bg-white text-blue-700 rounded-2xl hover:bg-slate-100 focus:outline-none focus:bg-white focus:ring focus:ring-blue-400 cursor-pointer'
                  value="Create Account" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

