import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import BlogEntry from "../blog/adminview/BlogEntry";
import './home.css'; // Import the CSS file for styling
import video from '../../Assets/video.mp4';
import Footer from '../footer/Footer';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [view,setView] = useState(false);
  const [viewId, setViewId] = useState("")



  useEffect(() => {
    axios.get('http://localhost:3001/blog/')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const toview = (id)=>{
    setView(true)
    setViewId(id)
    console.log("id",id)
    window.location.href = `/viewBlog?id=${id}`;


  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="video-container">
        <div className="above-video-text">
          <h1>EXPLORE. DREAM. DISCOVER</h1>
          <p>This is a world travel blog featuring destinations, new experiences, and hidden places around the globe.</p>
          <p>Please tag along.</p>
        </div>
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content home-container">
        {blogs.map((blog, index) => ( 
          <BlogEntry key={index} blog={blog}
          onView = {()=>toview(blog.id)}

          home = {true} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
