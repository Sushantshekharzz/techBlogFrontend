import React, { useState } from 'react';
import './login.css'; // Import CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from React Router
  import axios from 'axios';
import InvalidCredential from './InvalidCredential';



function Login() {
  // State to manage input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);


  // Function to handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {
      "userName":username,
      "password":password
      
    }
    try{
    await axios.post(`http://localhost:3001/login/`, data).then((output) => {
      if( output.data.message === 'invalid password')
        
        {
          setModalIsOpen(true)
        }
        if(output.data.message === 'Sucessfully Login')
          {
            const userName = output.data.user.username

            window.location.href = `/Addblog?userName=${userName}`; // Append data as query parameter

            // window.location.href = '/Addblog';

          }

    })
  }
  catch (e)
  {
    console.log("error", e)
  }





    
  };

  return (
    <div className="login-container">
      <h2 className='login'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username" >Username</label>
          <input
            type="text"
            id="username"
            className = "loginInput"
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
            className = "loginInput"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Add required attribute

          />
        </div>
        <button type="submit">Login</button>
        <p>Not have an account? <Link  style={{ textDecoration: 'none', color: 'inherit' }} to="/SignUp">Sign Up</Link></p>
        <InvalidCredential
          isOpen={modalIsOpen}
          // toLogin = {toLogin}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </form>
    </div>
  );
}

export default Login;
