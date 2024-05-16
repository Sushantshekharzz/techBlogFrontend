import React from 'react';
import './navbar.css'
const Navbar = () => {
    return (
        <nav class="navbar">
    <div class="container">
        
        <div class="auth-links">
            <a href="/Login" class="login-link">Login</a>
            <a href="/SignUp" class="signup-link">Sign Up</a>
        </div>
    </div>
</nav>

    );
};

export default Navbar;
