import BlogNavbar from './BlogNavbar'
import axios from 'axios';
import { useEffect } from 'react';
import BlogEntry from './adminview/BlogEntry';
import { useState } from 'react';
import UpdateBlog from './updateblog/UpdateBlog'
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import BlogView from '../blogview/BlogView';



function Blog() {


  const searchParams = new URLSearchParams(window.location.search);
  const userNameParam = searchParams.get('userName');
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [toRefresh, setToRefresh]=useState(false)
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const [updateRefresh, setUpdateRefresh] = useState(false);
  const [view,setView] = useState(false);
  const [viewId, setViewId] = useState("")



  useEffect(() => {
    axios.get(`http://localhost:3001/blog/${userNameParam}`).then((value) => {
      setBlogs(value.data);

    });

  }, [])

  const handleEdit = (index) => {
    setId(index)
    setToEdit(true)
    setModalIsOpen(true)
    setToRefresh(true)
    // Handle edit action
  };

  const handleDelete = async (index) => {
    // setToRefresh(true)

    try {
      await axios.delete(`http://localhost:3001/blog/${index}`)
      setDeleteRefresh(prevState => !prevState)

    }
    catch (error) {
      console.log("error", error)
    }

    // Handle delete action
  };

  useEffect(()=>{
    axios.get(`http://localhost:3001/blog/${userNameParam}`).then((value) => {
      setBlogs(value.data);

    });
  },[toRefresh, deleteRefresh, updateRefresh])

  const torefresh =  () =>{
    setToRefresh(prevState => !prevState);
  }
  const afterUpdate = () =>{
    setModalIsOpen(false)
    // setUpdateRefresh
    setUpdateRefresh(prevState => !prevState); // Toggle updateRefresh to trigger refresh
    // await new Promise(resolve => setTimeout(resolve, 1000));


    
  }
 

  return (
    <div >
      
      <div className="home-container">
    <Navbar />
    <BlogNavbar userName={userNameParam} 
      toRefresh = {torefresh}
      />
            <div className="content home-container">

      {blogs.map((blog, index) => (
        <BlogEntry key={index} blog={blog}
        
          onEdit={() => handleEdit(blog.id)}
          onDelete={() => handleDelete(blog.id)}
          
        />
      ))}
            </div>

      {toEdit?<UpdateBlog
        id={id}
        isOpen={modalIsOpen}
        onRequestClose={afterUpdate}
      />:''}

      </div>

<Footer/>
    </div>
  );
}

export default Blog;
