import React from 'react';
import './navbar.css';
import logo from '../../Assets/logo.jpg';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="container"> */}
                <img src={logo} alt="Logo" className="logo" />
                <div className="auth-links">
                <a href="/" className="signup-link">HOME</a>
                <a href="/Contact" className="login-link">CONTACT</a>

                    <a href="/Login" className="login-link">LOGIN</a>
                    <a href="/SignUp" className="signup-link">SIGNUP</a>
                </div>
            {/* </div> */}
        </nav>
    );
};

export default Navbar;
