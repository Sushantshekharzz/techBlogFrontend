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
      <h2>USERNAME ALREADY EXISTS</h2>
      <p>PLEASE CHOOSE ANOTHER USERNAME</p>
      <button onClick={onRequestClose}>CLOSE</button>
      <i className="bi bi-x-circle"></i>

    </Modal>
  );
};

export default UsernameExistsModal;
