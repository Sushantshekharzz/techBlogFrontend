import React from 'react';
import Modal from 'react-modal';
import './usernameexistmodal.css'; // Import the CSS file for styling

const UsernameExistsModal = ({ isOpen, onRequestClose, history }) => {

  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Username Exists Modal"
      className="username-exist-modal" // Apply the CSS class to the modal
    >
      <h2>Username Already Exist</h2>
      <p>Please Choose Another Username</p>
      <button onClick={onRequestClose}>Close</button>
      <i className="bi bi-x-circle"></i>

    </Modal>
  );
};

export default UsernameExistsModal;
