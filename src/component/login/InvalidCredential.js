import React from 'react';
import Modal from 'react-modal';
import './invalidcredential.css'; // Import the CSS file for styling

const InvalidCredential = ({ isOpen, onRequestClose }) => {

  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Username Exists Modal"
      className="invalid-credential-modal" // Apply the CSS class to the modal
    >
      <h2 >INVALID USERNAME OR PASSWORD</h2>
      <button  onClick={onRequestClose}>CLOSE</button>
     
    </Modal>
  );
};

export default InvalidCredential;
