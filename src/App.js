import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

//halaman yang diimport
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Product from "./pages/Product"
import CheckOut from "./pages/CheckOut"
import Kategori from "./pages/Kategori"
import MyOrder from "./pages/MyOrder"
import ProfileMyOrder from "./pages//ProfileMyOrder"
import ProfileSippingAddress from "./pages/ProfileSippingAddress"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import axios from "axios"
import * as Sentry from "@sentry/react"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyA0ftRyBkLWQfiEuTDc0jBLIjqTNtD3lYo",
  authDomain: "blanja-app-1c590.firebaseapp.com",
  projectId: "blanja-app-1c590",
  storageBucket: "blanja-app-1c590.appspot.com",
  messagingSenderId: "174765491398",
  appId: "1:174765491398:web:32fe4cba272daf893443c7",
  measurementId: "G-6NW92C0LWM",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

Sentry.init({
  dsn: "https://62069813ebac4d3083fe1bdd26276622@o4505384079065088.ingest.sentry.io/4505592559435776",
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/checkout/:id/:quantity",
    element: <CheckOut />,
  },
  {
    path: "/kategori/:category",
    element: <Kategori />,
  },
  {
    path: "/myorder",
    element: <MyOrder />,
  },
  {
    path: "/profilemyorder",
    element: <ProfileMyOrder />,
  },
  {
    path: "/profilemyorder",
    element: <profilemyorder />,
  },
  {
    path: "/profilesippingaddress",
    element: <ProfileSippingAddress />,
  },
])

function App() {
  axios.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("token")) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
