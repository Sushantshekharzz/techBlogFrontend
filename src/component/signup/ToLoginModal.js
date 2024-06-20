import React from 'react';
import Modal from 'react-modal';
import './tologinmodal.css'; // Import the CSS file for styling

const ToLoginModal = ({ toLogin, onRequestClose, history }) => {

  const Login = () => {
    window.location.href = '/Login';
  };

  return (
    <Modal
      isOpen={toLogin}
      onRequestClose={onRequestClose}
      contentLabel="Username Exists Modal"
      className="tologin-modal" // Apply the CSS class to the modal
    >
      <h2>Successfully Sign Up</h2>
      {/* <p>Please choose another username or <span onClick={handleLoginRedirect} className="login-link">login</span>.</p> */}
      <button onClick={Login} className='toLoginPage'>Login</button>

    </Modal>
  );
};

export default ToLoginModal;
