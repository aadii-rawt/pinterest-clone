import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { RxCross2 } from 'react-icons/rx';
function Signup({ setShowSignupModal }) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })
    // handle user credentials
    function handleData(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    // handle user singup form
    async function handleSingUp(e) {
        e.preventDefault()

        // Check if the username is already taken
        const usernameDoc = doc(db,"usernames", formData.username);
        const usernameSnapshot = await getDoc(usernameDoc);
        if (usernameSnapshot.exists()) {
            //   setError("Username is already taken");
            console.log("username is already exist");
            return;
        }

        if (formData.email || formData.password || formData.username) {
            try {
                // sign up using email and password
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                // Set displayName in user profile
                console.log(userCredential.user);;
                await updateProfile(userCredential.user,{ displayName: formData.username });
                console.log("update user",userCredential.user);
                setShowSignupModal(false)
                setFormData({
                    email: "",
                    password: "",
                    username: ""
                })
                // store user details in firestore database
                const usernameDocRef = doc(db, "usernames", formData.username);
                await setDoc(usernameDocRef, { uid: user.uid });
                setShowSignupModal(false) // close sign up form
            } catch (error) {
                console.log(error);
            }
        }
    }


    // handle Google Sign up
    const provider = new GoogleAuthProvider();
    async function handleGoogleSignup(e) {
        e.preventDefault();
        try {
            const userCredential = await signInWithPopup(auth, provider)
            await db.collection("users").doc(userCredential.user.uid).set({
                email: userCredential.user.email,
                username: userCredential.user.email,
                createdAt: serverTimestamp()
            })
            setShowSignupModal(false)
        } catch (error) {
            console.error(error);
        }
    }
    // close the sign up form
    const handleClose = (e) => {
        e.stopPropagation();
        setShowSignupModal(false);
    };
    return createPortal(
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen min-h-screen bg-black bg-opacity-80"
            onClick={handleClose} >
            <div className="relative bg-white mx-5 py-6 px-8 rounded-lg shadow-lg w-full md:w-3/5  lg:w-2/5"
                onClick={(e) => e.stopPropagation()} >
                <h2 className="text-center text-2xl font-bold mb-2">Save your favorite finds</h2>
                <p className="text-center text-gray-600 mb-6">Sign up to see more</p>
                <form onSubmit={handleSingUp}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
                        <input type="email" id="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
                        <input type="password" id="password"
                            name="password"
                            value={formData?.password}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Create a password" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600" htmlFor="username">username</label>
                        <input type="text" id="username"
                            name="username"
                            value={formData?.username}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="dd/mm/yyyy" />
                    </div>
                    <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600">Continue</button>
                </form>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <button onClick={handleGoogleSignup} className="w-full bg-white text-gray-700 p-2 border border-gray-300 rounded-3xl hover:bg-gray-100 flex items-center justify-center">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" className="mr-2" />
                    Continue with Google
                </button>
                <p className="text-center text-gray-500 text-sm mt-6">
                    By continuing, you agree to Pinterest's <a href="#" className="text-red-500">Terms of Service</a> and acknowledge you've read our <a href="#" className="text-red-500">Privacy Policy</a>.
                </p>
                <span className='absolute top-5 right-5 z-10 cursor-pointer p-2 rounded-full hover:bg-grayTheme' onClick={handleClose}><RxCross2 size={22} /></span>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Signup;
