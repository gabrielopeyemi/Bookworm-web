/* eslint-disable @next/next/no-img-element */

import React, { useContext, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { API } from '../config';

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('famosipe2010@gmail.com');
  const [password, setPassword] = useState('userspassword@12');
  const [error, setError] = useState({ status: false, message: 'dddcs' });

    
  const handleLogin = async () => {
    
    axios.post( `${API}auth/login`, { email, password }, {
      headers: {
          // 'authorization': your_token,
          'Content-Type': 'application/json',
          /*'Accept' : 'application/json',
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"*/
      }
    })
    .then(response => {
        console.log({ UI: response.data.data });
        if (typeof window !== "undefined") {
          localStorage.setItem('TOKEN', JSON.stringify(response.data.token))
          localStorage.setItem('DATA', JSON.stringify(response.data.data))
          localStorage.setItem('ISLOGIN', JSON.stringify({status: true}))
        }
        return  router.push('/dashboard')
    })
    .catch((error) => {
        // return  console.log({ error:  });
        setError({status: true, message: error.response.data});
        setTimeout(() => setError({status: false, message: ''}), 3000)
    });
      
  }
  
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to BookWorm</h2>
          </div>
          <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${error.status ? 'block' : 'hidden'}`} role="alert">
            <strong className="font-bold">Holy smokes!</strong>
            <br />
            <span className="block sm:inline">{error.message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError({status: false, message: ''})}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>


            <div>
              <section
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium cursor-pointer rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </section>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

