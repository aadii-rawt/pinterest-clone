import Home from "./Pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import CreatePost from "./Pages/CreatePost";
import Profile from "./Pages/Profile";
import Pin from "./Components/Pin";

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
        path: '/user',
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
  return (
    <RouterProvider router={router} />
  )
}

export default App
