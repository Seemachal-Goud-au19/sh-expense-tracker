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
      userEmail: action.email
    }
  }



}


export const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultState);
  const initialToken = localStorage.getItem('token'); //getting token from localstorage
  const [token, setToken] = useState(initialToken);

  const navigate = useNavigate();


  //for login
  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token)
    dispatch({ type: 'LOGIN', email })
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
  }

  const logoutHandler = () => {
    setToken(null);
    // setUserEmail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
  }



  const cartContextValues = {
    userEmail: cartState.userEmail,
    dispatch,
    //for login
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <CartContext.Provider value={cartContextValues}>
      {props.children}
    </CartContext.Provider>
  )
}


export default CartProvider;