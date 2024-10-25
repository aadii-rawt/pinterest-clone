import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { auth, db } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { RxCross2 } from 'react-icons/rx';
import { useData } from '../Context/DataProvider';

function Signup({ setShowSignupModal }) {
    const {user,setUser} = useData()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [error, setError] = useState("");

    // handle user credentials
    function handleData(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // handle user signup form
    async function handleSignup(e) {
        e.preventDefault();
    
        const usernameDoc = doc(db, "usernames", formData?.username);
        const usernameSnapshot = await getDoc(usernameDoc);
    
        if (usernameSnapshot.exists()) {
            setError("Username is already taken.");
            return;
        }
    
        if (formData.email && formData.password && formData.username) {
            try {
                // Sign up user with email and password

                await setPersistence(auth, browserLocalPersistence);
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    
                // Update the user's profile with the username
                await updateProfile(userCredential.user, { displayName: formData?.username });
    
                // Store the username in Firestore to prevent duplicates
                await setDoc(doc(db, "usernames", formData?.username), { uid: userCredential?.user?.uid });
    
                // Create the user data object
                const userData = {
                    email: formData.email,
                    username: formData.username,
                    createdAt: serverTimestamp(),
                    userId: userCredential.user.uid,
                    avatar: "",
                    following: [],
                    follower: []
                };
    
                // Store user details in the Firestore "users" collection
                await setDoc(doc(db, "users", userCredential.user.uid), userData);
    
                // Set the user state directly with userData
                setUser(userData);
    
                // Reset form data and close the signup modal
                setFormData({
                    email: "",
                    password: "",
                    username: ""
                });
                setError(""); // Clear error
                setShowSignupModal(false);
            } catch (error) {
                console.error("Error signing up:", error);
                setError("Failed to sign up. Please try again.");
            }
        } else {
            setError("All fields are required.");
        }
    }
    
    // handle Google Sign up
    const provider = new GoogleAuthProvider();
    async function handleGoogleSignup(e) {
        e.preventDefault();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Check if the user already exists in Firestore
            const userDoc = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDoc);

            // If the user does not exist, store the user details
            if (!userSnapshot.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    username: user.displayName || user.email.split('@')[0], // Use email prefix if displayName is null
                    createdAt: serverTimestamp(),
                    uid: user.uid
                });

                // Optionally, store the username in the "usernames" collection if desired
                await setDoc(doc(db, "usernames", user.displayName || user.email.split('@')[0]), {
                    uid: user.uid
                });
            }

            setShowSignupModal(false);
        } catch (error) {
            console.error(error);
            setError("Google Sign up failed.");
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
                <h2 className="text-center text-2xl font-bold mb-2">Sign Up</h2>
                <p className="text-center text-gray-600 mb-6">Create an account</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600 font-medium" htmlFor="email">Email</label>
                        <input type="email" id="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600 font-medium" htmlFor="password">Password</label>
                        <input type="password" id="password"
                            name="password"
                            value={formData?.password}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Create a password" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600 font-medium" htmlFor="username">Username</label>
                        <input type="text" id="username"
                            name="username"
                            value={formData?.username}
                            onChange={handleData} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Username" />
                    </div>
                    <button type="submit" className="w-full bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600 fontme">Continue</button>
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
                    By continuing, you agree to our <a href="#" className="text-red-500">Terms of Service</a> and <a href="#" className="text-red-500">Privacy Policy</a>.
                </p>
                <span className='absolute top-5 right-5 z-10 cursor-pointer p-2 rounded-full hover:bg-grayTheme' onClick={handleClose}><RxCross2 size={22} /></span>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default Signup;
