// Importing React
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Importing function
import { loginUser } from "../api/login";

import AuthContext from "../context/AuthContext1";
import { getProfile } from "../api/getProfile";

const LogIn = () => {
 const [email, setEmail] = useState();
 const [password, setUserPassword] = useState();

 const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required to sign in')
    .email('Invalid email address'),
    password: yup.string().required('Password is required to sign in').min(8, 'minimum 8 characters'),
})

const {
    register,
    handleSubmit,
    formState: { errors},
} = useForm({
    resolver: yupResolver(validationSchema),
});

 const auth = useContext(AuthContext);

 const navigate = useNavigate();

 const formSubmit = async (e) => {
//   e.preventDefault();

  const resp = await loginUser({ email, password });

  if ("accessToken" in resp) {
   localStorage.setItem("ApiToken", resp["accessToken"]);
   localStorage.setItem("UserProfile", JSON.stringify(resp));
   localStorage.setItem("isLoggedIn", true);

   const profileCall = await getProfile();
   localStorage.setItem("UserProfile", JSON.stringify(profileCall));
   navigate("/profile");
  } else {
   alert("No user");
  }
 };

 return (
  <>
  <section className="mb-25 z-50 -top-12">
    <div className="container mx-auto lg:px-0 bg-white shadow-2xl">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-primary-bold leading-9 tracking-[1.5px] text-black">
          
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
          onSubmit={handleSubmit(formSubmit)}
          className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
              <input
                    className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                    type="email"
                    {...register('email')}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    id="email"
                    placeholder="Your Email"
                  />
                  {errors && errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
              <input
                  className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                  type="password"
                  {...register('password')}
                  onChange={(e) => setUserPassword(e.target.value)}
                  id="password"
                  placeholder="Password"
                />
                {errors && errors.email && (
                <p className="text-xs italic text-red-500">{errors.password.message}</p>)} 
              </div>
            </div>

            <div className="input-wrapper">
                <button className="focus-shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
                
                variant="contained"
                color="primary"
                onClick={() => {
                 auth.storeUserData();
                }}>Sign In</button>
              </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            Not a member?{" "}
            <Link to={'/register'} className="font-semibold leading-6 text-blue-500 hover:text-blue-800">
               Signup for a new account 
            </Link>
          </p>
        </div>
      </div>
  </div>
  </section>
  </>
 );
};

export default LogIn;