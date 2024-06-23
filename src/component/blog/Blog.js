import BlogNavbar from './BlogNavbar'
import axios from 'axios';
import { useEffect } from 'react';
import BlogEntry from './adminview/BlogEntry';
import { useState } from 'react';
import UpdateBlog from './updateblog/UpdateBlog'
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './blog.css'
// import BlogView from '../blogview/BlogView';
import SearchBar from '../searchbar/Searchbar';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";





function Blog() {


  const searchParams = new URLSearchParams(window.location.search);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlog, setFilteredBlog] = useState([]);
  const location = useLocation();
  const userNameParam = location.state.userName || {};


  // const userNameParam = searchParams.get('userName');
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [toRefresh, setToRefresh] = useState(false)
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const [updateRefresh, setUpdateRefresh] = useState(false);
  const [view, setView] = useState(false);
  const [viewId, setViewId] = useState("")
  const [searchClick, setSearchClick] = useState(false);
  const [searchAv, setSearchAv] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredBlog(filterBlogs(blogs, searchTerm, filterCriteria));

  }, [searchClick]);

  const filterBlogs = (blogs, searchTerm, filterCriteria) => {
    return blogs.filter(blog =>
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
      // ||
      // blog.category.toLowerCase().includes(searchTerm.toLowerCase())) 
      &&
      (filterCriteria === '' || blog.category.toLowerCase() === filterCriteria.toLowerCase())
    );
  };




  useEffect(() => {
    try{
    const token   = localStorage.getItem('token')
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    axios.get(`http://localhost:3001/blog/${userNameParam}`,{headers}).then((value) => {
      setBlogs(value.data);

    })}
    catch(e){
      navigate("/Login")
      console.error("Error:", e);

    }

  }, [])
  const filterClose = () => {
    setSearchAv(false);
    setSearchTerm('');
    setFilterCriteria('');
  }

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
      const token   = localStorage.getItem('token')
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      };
      await axios.delete(`http://localhost:3001/blog/${index}`,{headers})
      setDeleteRefresh(prevState => !prevState)

    }
    catch (error) {
      navigate("/Login")
            console.error("Error:", error);


      console.log("error", error)
    }

    // Handle delete action
  };

  useEffect(() => {
    try{
    const token   = localStorage.getItem('token')

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };
  
    axios.get(`http://localhost:3001/blog/${userNameParam}`,{headers}).then((value) => {
      setBlogs(value.data);

    });
  }catch(e){
    navigate("/Login")
  }
  }, [toRefresh, deleteRefresh, updateRefresh])

  const torefresh = () => {
    setToRefresh(prevState => !prevState);
  }
  const afterUpdate = () => {
    setModalIsOpen(false)
    // setUpdateRefresh
    setUpdateRefresh(prevState => !prevState); // Toggle updateRefresh to trigger refresh
    // await new Promise(resolve => setTimeout(resolve, 1000));



  }
  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };
  const search = () => {
    setSearchAv(true);
    setSearchClick(search => !search)
  };


  return (

    <div className="blog-container">
      {/* <Navbar /> */}
      <BlogNavbar userName={userNameParam}
        toRefresh={torefresh}
      />
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <select value={filterCriteria} onChange={handleFilterChange}>
          <option value="">Continent</option>
          <option value="AFRICA">AFRICA</option>
          <option value="ANTARTICA">ANTARTICA</option>
          <option value="ASIA">ASIA</option>
          <option value="AUSTRALIA">AUSTRALIA</option>
          <option value="EUROPE">EUROPE</option>
          <option value="NORTH AMERICA">NORTH AMERICA</option>
          <option value="SOUTH AMERICA">SOUTH AMERICA</option>
        </select>
        <button onClick={search}><i className="fa fa-filter"></i></button>
        <button onClick={filterClose}><i className="bi bi-x-circle-fill"></i></button>
      </div>
      <div className="content blog-container">
        {searchAv ? (
          filteredBlog.map((blog, index) => (
            <BlogEntry key={index} blog={blog} onEdit={() => handleEdit(blog.id)}
              onDelete={() => handleDelete(blog.id)}
            />
          ))
        ) : (
          blogs.map((blog, index) => (
            <BlogEntry key={index} blog={blog} onEdit={() => handleEdit(blog.id)}
              onDelete={() => handleDelete(blog.id)}
            />
          ))
        )}
      </div>

      {toEdit ? <UpdateBlog
        id={id}
        isOpen={modalIsOpen}
        onRequestClose={afterUpdate}
      /> : null}
      <Footer />
    </div>


  );
}

export default Blog;
