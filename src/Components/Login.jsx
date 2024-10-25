import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../firebase';
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { RxCross2 } from 'react-icons/rx';
import { useData } from '../Context/DataProvider';
// import { users } from '../utils';
import { json } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

function Login({ }) {
  const { user, setUser, setShowLoginModel, users } = useData()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  function handleData(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // function handleLogin(e){
  //   e.preventDefault()
  //   users?.map((u) => {
  //     if(u?.email === formData?.email && u?.password === formData?.password){
  //       setUser(u)
  //       setShowLoginModel(false)
  //       setFormData({
  //         email: "",
  //         password: ""
  //       })
  //       console.log("login successfully");

  //     }else{
  //       setError("Invalid email and password")
  //     }
  //   })
  //   console.log("login");
  // }


  async function handleLogin(e) {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (formData.email && formData.password) {
      try {
        // Authenticate user with email and password


        await setPersistence(auth, browserLocalPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

        // Get the user ID from the authenticated user
        const uid = userCredential.user.uid;

        // Fetch user details from Firestore using the uid
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          // Set the user state with fetched user data
          setUser(userDoc.data());

          // Close login modal and reset form data
          setShowLoginModel(false);
          setFormData({
            email: "",
            password: ""
          });
          console.log("Login successful!");
        } else {
          console.log("No such user found in Firestore.");
          setError("User data not found.");
        }
      } catch (error) {
        const errorMessage = error?.message;
        console.error("Error during login:", errorMessage);
        setError("Invalid email or password.");
      }
    } else {
      setError("Please enter both email and password.");
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
          <img src="./logo.png" alt="Pinterest Logo" className="h-10" />
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
          {error &&
            <div><p className="text-red-700">{error}</p></div>
          }
          <div className="flex justify-between mb-6">
            <a href="#" className="text-blue-600 text-sm">Forgot your password?</a>
          </div>
          <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600">Log in</button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button className="w-full bg-white text-gray-700 p-2 border border-gray-300 rounded-3xl hover:bg-gray-100">Continue with Google</button>
        <button className='absolute top-5 right-5 z-10 cursor-pointer p-2 rounded-full hover:bg-grayTheme' onClick={handleClose}><RxCross2 size={22} /></button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Login;
