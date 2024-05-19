import React, { useState } from 'react';
import './signup.css'; // Import CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import UsernameExistsModal from './UsernameExistsModal';
import ToLoginModal from './ToLoginModal';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';



function SignUp() {
  // State to manage input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toLogin,setToLogin] = useState(false);
  const [name,setName] = useState('')



  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "userName": username,
      "password": password,
      "name":name

    }
    console.log("data",data)

    await axios.post(`http://localhost:3001/signup/`, data).then((output) => {
      if (output.data.message === 'username already exist') {
        setModalIsOpen(true)
      }
      if (output.data.message === 'username sucessfully created') {
        // window.location.href = '/Login';
        setToLogin(true)
      }
    });



  };

  return (
    <div className="">
    <Navbar />
    <div className="signup-container">
         

      <h2 className='login-title'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <label htmlFor="password">Name</label>
          <input
            type="text"
            id="password"
            className = "login-input"

            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Add required attribute

          />
        </div>
        <div className="input-group">
          
          <label htmlFor="username" >Username</label>
          <input
            type="text"
            id="username"
            className='login-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Add required attribute

          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className = "login-input"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Add required attribute

          />
        </div>

        
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/Login">Login</Link></p>

        <UsernameExistsModal
          isOpen={modalIsOpen}
          // toLogin = {toLogin}
          onRequestClose={() => setModalIsOpen(false)}
        />
        <ToLoginModal
                  toLogin = {toLogin}

        />
      </form>
      </div>
<Footer/>
    </div>
  );
}

export default SignUp;
