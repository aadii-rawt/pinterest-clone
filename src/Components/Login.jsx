import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RxCross2 } from 'react-icons/rx';

function Login({setShowLoginModel }) {

  const [formData,setFormData] = useState({
    email: "",
    password: "",
  })
  function handleData(e){
    const {name,value} = e.target
    setFormData((prev) => ({...prev,[name]:value}))
  }

  async function handleLogin(e){
    e.preventDefault();
    if ((formData.email, formData.password)) {
      try {
        const usercredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        setShowLoginModel(false)
        setFormData({
          email: "",
          password: ""
        })
      } catch (error) {
        const errorMessage = error?.message;
        console.log(errorMessage);
      }
    }
  }
  // close login form
  const handleClose = (e) => {
    e.stopPropagation();
    setShowLoginModel(false);
  };

  return createPortal(
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen min-h-screen bg-black bg-opacity-80"
      onClick={handleClose}>
      <div className="relative bg-white mx-5 py-8 px-8 rounded-lg shadow-lg  w-full md:w-3/5  lg:w-2/5"
        onClick={(e) => e.stopPropagation()} >
        <div className="flex justify-center mb-4">
          <img src="https://via.placeholder.com/40" alt="Pinterest Logo" className="h-10" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">Log in to see more</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
            <input type="email" id="email" 
            name='email'
            value={formData?.email}
            onChange={handleData}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
            <input type="password" id="password" 
            name='password'
            value={formData?.password}
            onChange={handleData}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex justify-between mb-6">
            <a href="#" className="text-red-500 text-sm">Forgot your password?</a>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600">Log in</button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button className="w-full bg-white text-gray-700 p-2 border border-gray-300 rounded-3xl hover:bg-gray-100">Continue with Google</button>
        <span className='absolute top-5 right-5 z-10 cursor-pointer p-2 rounded-full hover:bg-grayTheme' onClick={handleClose}><RxCross2 size={22} /></span>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Login;
