import React, { useState } from 'react';
import Modal from 'react-modal';
import './updateblog.css';
import axios from 'axios';
import { useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Set the width of the modal
    height: '80%', // Set the height of the modal
    overflow: 'auto' // Enable overflow scrolling if content exceeds modal height
  }
};

const UpdateBlog = ({ isOpen, onRequestClose , userName, id}) => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [category, setCategory] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [image, setImage] = useState(null); // State to store selected image file
    const [incomingImage, setIncomingImage] = useState('')

  const handleSubmit = () =>{
    if (!title || !shortDescription || !category || !longDescription || !image) {
        alert('Please fill in all mandatory fields.');
        return; // Stop further execution
    }
    const data = {
        "title": title,
        "shortDescription": shortDescription,
        "category": category, 
        "longDescription": longDescription,
        "image": image,
        "username": userName
    };
    try{
     axios.put(`http://localhost:3001/blog/${id}`, data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(()=>{
        resetState();
        onRequestClose();
    
      });
    }
    catch(error)
    {
        console.log("error",error)
    }


  }
    useEffect(()=>{
        console.log("id",id)
    

         axios.get(`http://localhost:3001/blog/get/${id}`).then((value) => {
            setTitle(value.data[0].title)
            setShortDescription(value.data[0].shortDescription)
            setCategory(value.data[0].category)
            setLongDescription(value.data[0].longDescription)


            // setImage(value.data[0].image)

            const image = value.data[0].image.replace(/\\/g, '/'); // Replace backslashes with forward slashes
  const baseUrl = 'http://localhost:3001/';
  const imageUrl = baseUrl + image;
  setIncomingImage(imageUrl)
    })
  
    },[id])
    

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        
        const reader = new FileReader();
        reader.onload = () => {
            setIncomingImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        

    };

    const resetState = () => {
        setTitle('');
        setShortDescription('');
        setCategory('');
        setLongDescription('');
        setImage(null);
    };

    // Reset state when isOpen changes (modal is opened or closed)
    // useEffect(() => {
    //     if (!isOpen) {
    //         resetState();
    //     }
    // }, [isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customStyles}
                contentLabel="Username Exists Modal"
                className="small-modal-update" // Apply the CSS class to the modal
            >
                <h2>Title</h2>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <h2>Short Description</h2>
                <textarea value={shortDescription} className="shortdesc" onChange={(e) => setShortDescription(e.target.value)} />
                <h2>Destination</h2>
                <select className='dropDown' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Destination</option>
                    <option value="AFRICA">AFRICA</option>
                    <option value="ANTARTICA">ANTARTICA</option>
                    <option value="ASIA">ASIA</option>
                    <option value="AUSTRALIA">AUSTRALIA</option>
                    <option value="EUROPE">EUROPE</option>
                    <option value="NORTH AMERICA">NORTH AMERICA</option>
                    <option value="SOUTH AMERICA">SOUTH AMERICA</option>
                </select>
                <h2>Long Description</h2>
                <textarea className='longdesc' value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
                <h2>Upload Image</h2>
                <div className="preview-container">
        <img src={incomingImage} alt={title} className="preview-image" />
      </div>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button onClick={handleSubmit}>Submit</button>
            </Modal>
        </>
    );
};

export default UpdateBlog;
