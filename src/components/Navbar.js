import React, { useContext } from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import CartContext from '../store/cart-context';
import { useSelector } from 'react-redux';
import { logout } from '../redux-store/authenticationSlice';

import './Navbar.css'

const NavBar = () => {
    const cartCtx = useContext(CartContext)
    // const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn)
    const isLoggedIn = cartCtx.isLoggedIn

    const { pathname } = useLocation();
 return (
        <Navbar expand="lg" className="navbar">
           
                {isLoggedIn && <Button className='logout-btn'  variant="outline-danger" onClick={()=>{cartCtx.logout()}}>Logout</Button>}

        </Navbar>
    );
}

export default NavBar;



{/* <div class="navbar-container"><a class="brand" href="/"><p class="text-gradient">SHARPENER</p></a><div class="navbar"><ul><li><a href="/" class="active-link">Home</a></li><li><a href="/success-stories" class="">Success Stories</a></li><li><a href="/hr" class="">Hire Superstars</a></li></ul><a class="action_btn" target="_blank" rel="noopener noreferrer" href="https://student.sharpener.tech/login">Login</a></div></div> */}