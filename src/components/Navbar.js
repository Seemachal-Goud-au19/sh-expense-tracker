import React, { useContext } from 'react'
import { useLocation, Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import CartContext from '../store/cart-context';
import { useSelector } from 'react-redux';
import { logout } from '../redux-store/authenticationSlice';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CgProfile } from "react-icons/cg";

import './Navbar.css'

const NavBar = ({ verified, setVerified }) => {
    const cartCtx = useContext(CartContext)
    // const isLoggedIn = useSelector((state)=>state.authentication.isLoggedIn)
    const isLoggedIn = cartCtx.isLoggedIn
    const userEmail = localStorage.getItem('email') || ''

    const { pathname } = useLocation();

    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <NavLink to='/profile' className={pathname.includes("profile") && 'active'}>Profile</NavLink>
                <NavLink to='/expense' className={pathname.includes("expense") && 'active'}>Expense</NavLink>
            </Container>
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">{userEmail}</Tooltip>}>
                <span className="profile-icon"><CgProfile /></span>
            </OverlayTrigger>
            <Button className='logout-btn' variant="outline-danger" onClick={() => {
                // setVerified(false)
                cartCtx.logout()
            }}>Logout</Button>
        </Navbar>
    );
}

export default NavBar;



