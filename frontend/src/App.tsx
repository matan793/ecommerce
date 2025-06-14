import { useState } from 'react'
import ParfumeCard from './components/parfumeCard/parfumeCard'
import LoginPage from './components/loginPage/LoginPage'
import HomePage from './components/HomePage'
import './App.css'
import { useUser } from './contexts'
import { Outlet, useNavigate } from 'react-router-dom'
import Cart from './components/cart/Cart'
import Navbar from './components/Navbar/Navbar'
import { api, apiClient } from './api/api'
import { CartItemType, UserType } from './utils/types/types'
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {OrderModal} from './components/OrderModal/OrderModal'



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await apiClient.post('/auth/logout', { withCredentials: true });
      if (res.status === 200) {
        setUser(null);
      } else {
        toast.error('logout failed')
      }
    } catch (error) {
       toast.error('logout failed')

    } finally {

    }
  }

  const menuOptions: { title: string; onClick: () => void }[] = [
    {
      title: 'Cart',
      onClick: () => setIsCartOpen(true),
    },
    {
      title: 'Profile',
      onClick: () => { navigate('/profile') },
    },
    {
      title: 'Logout',
      onClick: handleLogout,
    },

  ];
  const handleUpdateQuantity = async (id: number, newQuantity: number): Promise<void> => {
    try {
      const newUser = { ...user };
      if (user && newUser.cart) {
        const cartItem = newUser.cart.find((item: CartItemType) => item.productId === id);
        if (cartItem) {
          const quantityDiff = newQuantity - cartItem.quantity;
          await api.addToCart(id, quantityDiff);
          cartItem.quantity = newQuantity;
          setUser(newUser as UserType);
        }
      }
    } catch (error) {
      toast.error('faild to update cart please try again later')
      // You might want to show an error message to the user
    }
  }
     
  return (
    <>
      <Navbar menuItems={menuOptions} menuButtonCallback={() => setIsCartOpen(true)} />
      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={user?.cart || []}
        onUpdateQuantity={handleUpdateQuantity}
        onPurchaceNow={() => { }}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* <OrderModal /> */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
