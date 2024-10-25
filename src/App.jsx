import { lazy, useEffect } from "react";
import Home from "./Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CreatePost from "./Pages/CreatePost";
import { useData } from "./Context/DataProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserProfile from "./Pages/UserProfile";
const Pin = lazy(() => import('./Components/Pin'))
const Profile = lazy(() => import('./Pages/Profile'))
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";



const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/create',
        element: <ProtectedRoute><CreatePost /></ProtectedRoute>
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "/pin/:id",
        element: <Pin />
      },
      {
        path: "/user/:id",
        element: <UserProfile />
      }
    ]
  }
])


function App() {
  const { user ,setUser} = useData()
  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("userAuth", JSON.stringify(user))
  //   }
  // }, [user])


// Inside your component
useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // Fetch user details from Firestore using the user's UID
      getDoc(doc(db, "users", user.uid)).then((userDoc) => {
        if (userDoc.exists()) {
          setUser(userDoc.data());
          console.log("User is still logged in.");
        }
      });
    } else {
      console.log("No user is logged in.");
    }
  });

  // Cleanup the listener on component unmount
  return () => unsubscribe();
}, []);


  return (
    <RouterProvider router={router} />
  )
}

export default App
