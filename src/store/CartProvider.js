import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from './cart-context'
import axios from 'axios';

const defaultState = {
  userEmail: localStorage.getItem('email'),
}





const cartReducer = (state, action) => {

  if (action.type === 'LOGIN') {
    return {
      ...state,
      verified: true
    }
  }

}


export const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultState);
  const initialToken = localStorage.getItem('token');
  const initialVerified = JSON.parse(localStorage.getItem('verified'));
  const [token, setToken] = useState(initialToken);
  const [verified, setVerified] = useState(initialVerified)

  const navigate = useNavigate();


  //for login
  const userIsLoggedIn = !!token;
  const userIsverified = verified;

  const loginHandler = (token, email) => {
    setToken(token)
    dispatch({ type: 'LOGIN', email })
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
  }

  const logoutHandler = () => {
    setToken(null);
    // setUserEmail(null)
    setVerified(false)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.setItem('verified', false)
    navigate('/login')
  }

  const verifyHandler = () => {
    setVerified(true)
    localStorage.setItem('verified', true)
  }



  const cartContextValues = {
    userEmail: cartState.userEmail,
    dispatch,
    //for login
    token: token,
    isLoggedIn: userIsLoggedIn,
    isVerified: userIsverified,
    login: loginHandler,
    logout: logoutHandler,
    verifyHandler: verifyHandler
  }

  return (
    <CartContext.Provider value={cartContextValues}>
      {props.children}
    </CartContext.Provider>
  )
}


export default CartProvider;