import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.tsx'
import LoginPage from './components/loginPage/LoginPage.tsx'



const router = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/login', element: <LoginPage />},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
