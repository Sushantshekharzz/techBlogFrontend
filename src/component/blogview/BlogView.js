import { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './blogview.css'

const BlogView = (props) =>{
    const searchParams = new URLSearchParams(window.location.search);

    const id = searchParams.get('id');
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [category, setCategory] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [incomingImage, setIncomingImage] = useState('')

 

    useEffect(()=>{
    

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
    return(
        <>
        <Navbar />
        <div className="main-content">
          <img src={incomingImage} alt="Blog" className="view-blog-image" />
          <div className="blog-details">
            {/* <h1>Title: {title}</h1> */}
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Continent:</strong> {category}</p>
            <p><strong>Short Desc:</strong> {shortDescription}</p>
            <p><strong>Long Desc:</strong> {longDescription}</p>
          </div>
        </div>
        <Footer />
        </>
    )

}
export default BlogView