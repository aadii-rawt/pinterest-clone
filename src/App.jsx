import { lazy, useEffect } from "react";
import Home from "./Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CreatePost from "./Pages/CreatePost";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserProfile from "./Pages/UserProfile";
const Pin = lazy(() => import('./Components/Pin'))
const Profile = lazy(() => import('./Pages/Profile'))
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import NotFound from "./Pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Store/Reducers/userReducer";



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
    ],
    errorElement: <NotFound />
  }
])


function App() {

  const dispatch = useDispatch()
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth
      , (user) => {
        if (user) {
          // Fetch user details from Firestore using the user's UID
          getDoc(doc(db, "users", user.uid)).then((userDoc) => {
            if (userDoc.exists()) {
              // setUser(userDoc.data());
              dispatch(setUser(userDoc.data()))
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
