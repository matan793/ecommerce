import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage.tsx'
import LoginPage from './components/loginPage/LoginPage.tsx'
import { UserProvider } from './contexts/userContext.tsx'
import './app.css'
import RegisterPage from './components/registerPage/register.tsx'
import NotFoundPage from './components/notFoundPage/NotFoundPage.tsx'
import App from './App.tsx'
import { BuyModeProvider } from './contexts/buyModeContext.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // <-- use Layout as the root element
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BuyModeProvider>
        <RouterProvider router={router} />
      </BuyModeProvider>
    </UserProvider >
  </React.StrictMode>,
)
