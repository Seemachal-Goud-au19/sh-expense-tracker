import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import NavBar from './components/Navbar';
import Forgetpass from './routes/Auth/Forgetpass';
import Expense from './routes/Expenses/Expense';
import Counter from './components/reduxLearnComponent/Counter';
import Header from './components/reduxLearnComponent/Header';
import UserProfile from './components/reduxLearnComponent/UserProfile';
import Auth from './components/reduxLearnComponent/Auth';

import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth.isAuthanticated)
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/login"
          element={<AuthForm />} />

        <Route
          path="/forget-pass"
          element={<Forgetpass />} />

        <Route
          path="/profile"
          element={<Profile />} />
        <Route
          path="/expense"
          element={<Expense />} />
      </Routes>
      {/* <Header />
      {!auth && <Auth />}
      {auth && <UserProfile />}
      <Counter /> */}
    </>
  );
}

export default App;
