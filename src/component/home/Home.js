import Navbar from "../navbar/Navbar";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import BlogEntry from "../blog/adminview/BlogEntry";



function Home() {
    const [blogs, setBlogs] = useState([]);


  useEffect(()=>{
     axios.get(`http://localhost:3001/blog/`).then((value)=>{
      setBlogs(value.data);

     });

  }, [])
    return (
      <div >
        <Navbar/>
        {blogs.map((blog, index) => (
        <BlogEntry key={index} blog={blog} 
        home = {true}
/>
      ))}          

   
      </div>
    );
  }
  
export default Home;
  