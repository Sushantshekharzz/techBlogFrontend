import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../navbar/Navbar";
import BlogEntry from "../blog/blogcard/BlogEntry";
import './home.css'; // Import the CSS file for styling
import video from '../../Assets/video.mp4';
import Footer from '../footer/Footer';
import SearchBar from '../searchbar/Searchbar';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAv, setSearchAv] = useState(false);
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [searchClick, setSearchClick] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/blog/')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredBlog(filterBlogs(blogs, searchTerm, filterCriteria));

  }, [searchClick]);

  const toview = (id) => {
    window.location.href = `/viewBlog?id=${id}`;
  };

  const search = () => {
    setSearchAv(true);
    setSearchClick(search => !search)
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const filterBlogs = (blogs, searchTerm, filterCriteria) => {
    return blogs.filter(blog =>
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
      // ||
      // blog.category.toLowerCase().includes(searchTerm.toLowerCase())) 
      &&
      (filterCriteria === '' || blog.category.toLowerCase() === filterCriteria.toLowerCase())
    );
  };
  const filterClose = () => {
    setSearchAv(false);
    setSearchTerm('');
    setFilterCriteria('');
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
      <div className="content home-container">
        {searchAv ? (
          filteredBlog.map((blog, index) => (
            <BlogEntry key={index} blog={blog} onView={() => toview(blog.id)} home={true} />
          ))
        ) : (
          blogs.map((blog, index) => (
            <BlogEntry key={index} blog={blog} onView={() => toview(blog.id)} home={true} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
