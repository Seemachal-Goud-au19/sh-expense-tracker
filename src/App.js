import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';
import NavBar from './components/Navbar';
import Forgetpass from './routes/Auth/Forgetpass';

function App() {

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
      </Routes>
    </>
  );
}

export default App;
