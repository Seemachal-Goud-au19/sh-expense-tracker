import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import NavBar from './components/Navbar';
import Forgetpass from './routes/Auth/Forgetpass';
import Expense from './routes/Expenses/Expense';
import Layout from './components/shoppingComponents/Layout/Layout';
import Cart from './components/shoppingComponents/Cart/Cart';
import Products from './components/shoppingComponents/Shop/Products';
import Expense2 from './routes/Expenses/Expense2';
import { login } from './redux-store/authenticationSlice';
import CartContext from './store/cart-context';


import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true);

  const cartCtx = useContext(CartContext)

  // const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn)
  const isLoggedIn = cartCtx.isLoggedIn



  useEffect(() => {

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {

      dispatch(login({ token, email }));
      setVerified(true);
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* {verified && <NavBar />}

      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Home verified={verified} setVerified={setVerified} /> : <Navigate to='/login' />} />

        {!isLoggedIn && <Route
          path="/login"
          element={<AuthForm />} />}


        <Route
          path="/forget-pass"
          element={isLoggedIn ? <Forgetpass /> : <Navigate to='/login' />} />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />
        <Route
          path="/expense"
          element={isLoggedIn ? <Expense /> : <Navigate to='/login' />} />

        <Route
          path="*"
          element={<Navigate to='/' />}
        />
      </Routes> */}

    <Layout>
      <Cart />
      <Products />
    </Layout>

    </>
  );
}

export default App;






