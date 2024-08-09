import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import UserFeed from './routes/UserFeed';
import YourProfile from './routes/YourProfile';
import Profile from './routes/Profile';
import Root from './routes/Root';
import SignUp from './routes/SignUp';
import ProtectedRoutes from "./components/Auth/protectedRoutes";
import LogInRedirect from './components/Auth/LogInRedirect';
import { AuthContextProvider } from './context/AuthContext';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthContextProvider><LogInRedirect><Root /></LogInRedirect></AuthContextProvider>,
  },
  {
    path: "/signup/",
    element: <AuthContextProvider><LogInRedirect><SignUp /></LogInRedirect></AuthContextProvider>,
  },
  {
    path: "/feed/",
    element: <AuthContextProvider><ProtectedRoutes><UserFeed /></ProtectedRoutes></AuthContextProvider>,
  },
  {
    path: "/profile/",
    element: <AuthContextProvider><ProtectedRoutes><YourProfile /></ProtectedRoutes></AuthContextProvider>,
  },
  {
    path: "/profile/:username",
    element: <AuthContextProvider><Profile /></AuthContextProvider>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
  </React.StrictMode>,
)
