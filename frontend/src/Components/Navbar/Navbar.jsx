import React, { useState, useContext } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Search from '../Search/Search';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { user } = useContext(UserContext); 

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>YAK</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === 'shop' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === 'mens' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("womens") }}>
                    <Link style={{ textDecoration: 'none' }} to='womens'>Women</Link>
                    {menu === 'womens' ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link style={{ textDecoration: 'none' }} to='kids'>Kids</Link>
                    {menu === 'kids' ? <hr /> : null}
                </li>
            </ul>

            <Search />

            <div className="nav-login-cart">
                {!user ? (
                    <Link to='/login'><button>Login</button></Link>
                ) : (
                    <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                )}
            </div>
        </div>
    );
};

export default Navbar; 