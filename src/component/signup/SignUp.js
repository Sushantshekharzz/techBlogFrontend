import React, { useState } from 'react';
import './signup.css'; // Import CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import UsernameExistsModal from './UsernameExistsModal';
import ToLoginModal from './ToLoginModal';



function SignUp() {
  // State to manage input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toLogin,setToLogin] = useState(false);



  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "userName": username,
      "password": password

    }

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
    <div className="login-container">
      <h2 className='login'>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" >USERNAME</label>
          <input
            type="text"
            id="username"
            className='signup-input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Add required attribute

          />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            className = "loginInput"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Add required attribute

          />
        </div>
        <button type="submit">SIGN UP</button>
        <p>Already have an account? <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/Login">LOGIN</Link></p>

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
  );
}

export default SignUp;
