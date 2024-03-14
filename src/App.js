import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import NavBar from './components/Navbar';
import Forgetpass from './routes/Auth/Forgetpass';
import Expense from './routes/Expenses/Expense';
import CartContext from './store/cart-context';



function App() {

  const initialVerified = JSON.parse(localStorage.getItem('verified'))
  const [verified, setVerified] = useState(initialVerified)
  const [loading, setLoading] = useState(true);

  const cartCtx = useContext(CartContext)

  // const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn)
  const isLoggedIn = cartCtx.isLoggedIn



  return (
    <>
      {(isLoggedIn) && <NavBar verified={verified} setVerified={setVerified} />}

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
      </Routes>


    </>
  );
}

export default App;






