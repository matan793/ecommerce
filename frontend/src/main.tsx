import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.tsx'
import LoginPage from './components/loginPage/LoginPage.tsx'
import { UserProvider } from './contexts/userContext.tsx'
import './app.css'
import RegisterPage from './components/registerPage/register.tsx'
import NotFoundPage from './components/notFoundPage/NotFoundPage.tsx'


const router = createBrowserRouter([
  {path: '/', element: <HomePage />, errorElement: <NotFoundPage />},
  {path: '/login', element: <LoginPage />},
  {path: '/register', element: <RegisterPage />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider >
  </React.StrictMode>,
)
