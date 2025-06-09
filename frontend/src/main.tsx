import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.tsx'
import LoginPage from './components/loginPage/LoginPage.tsx'
import { UserProvider } from './contexts/userContext.tsx'



const router = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/login', element: <LoginPage />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider >
  </React.StrictMode>,
)
