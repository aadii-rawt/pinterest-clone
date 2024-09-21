import Home from "./Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";
import Pin from "./Components/Pin";
import { useData } from "./Context/DataProvider";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children : [
      {
        path : "/",
        element: <Home />
      },
      {
        path: '/create',
        element: <CreatePost />
      },
      {
        path: '/profile',
        element:<Profile />
      },
      {
        path: "/pin/:id",
        element: <Pin />
      }
    ]
  }
])


function App() {
  const {user} = useData()
  useEffect(() => {
    if(user){     
      localStorage.setItem("userAuth",JSON.stringify(user))
    }
  }, [user])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
