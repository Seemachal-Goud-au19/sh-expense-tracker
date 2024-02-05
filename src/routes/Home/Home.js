import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className='welcome'>
      <p>Welcome to Expense Tracker!!!</p>
      <p>Your profile is Incomplete.<Link to='/profile'>Complete now</Link></p>
    </div>
  )
}

export default Home
