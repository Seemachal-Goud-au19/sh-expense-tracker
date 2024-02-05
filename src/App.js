import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';
import Profile from './routes/Profile/Profile';

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/login"
          element={<AuthForm />} />

        <Route
          path="/profile"
          element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
