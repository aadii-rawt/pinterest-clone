import { lazy, useEffect } from "react";
import Home from "./Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CreatePost from "./Pages/CreatePost";
import { useData } from "./Context/DataProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
const Pin = lazy(() => import('./Components/Pin'))
const Profile = lazy(() => import('./Pages/Profile'))


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
        element: <Profile />
      }
    ]
  }
])


function App() {
  const { user } = useData()
  useEffect(() => {
    if (user) {
      localStorage.setItem("userAuth", JSON.stringify(user))
    }
  }, [user])

  return (
    <RouterProvider router={router} />
  )
}

export default App
