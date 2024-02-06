import React, { useContext } from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import CartContext from '../store/cart-context';

const NavBar = ({ setIsShowCart }) => {
    const cartCtx = useContext(CartContext)

    const { pathname } = useLocation();
    return (
        <Navbar expand="lg" className="" style={{ backgroundColor: 'black' }}>
            <Container>
                {cartCtx.isLoggedIn &&  <Button variant="outline-danger" onClick={cartCtx.logout}>Logout</Button>}

            </Container>
        </Navbar>
    );
}

export default NavBar;