import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import AuthForm from './routes/Auth/AuthForm';
import Home from './routes/Home/Home';

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
      </Routes>
    </>
  );
}

export default App;
