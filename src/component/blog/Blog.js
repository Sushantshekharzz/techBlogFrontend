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



  function Blog() {


    const searchParams = new URLSearchParams(window.location.search);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlog, setFilteredBlog] = useState([]);

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
    const [searchClick, setSearchClick] = useState(false);
    const [searchAv, setSearchAv] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState('');

    useEffect(() => {
      console.log("workingqqqqqqqqqqqqqqqqq")
      console.log(filterBlogs(blogs, searchTerm, filterCriteria))
        setFilteredBlog(filterBlogs(blogs, searchTerm, filterCriteria));
      
    }, [searchClick]);
    
  const filterBlogs = (blogs, searchTerm, filterCriteria) => {
    console.log("working")
    return blogs.filter(blog =>
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) )
      // ||
      // blog.category.toLowerCase().includes(searchTerm.toLowerCase())) 
      &&
      (filterCriteria === '' || blog.category.toLowerCase() === filterCriteria.toLowerCase())
    );
  };




    useEffect(() => {
      axios.get(`http://localhost:3001/blog/${userNameParam}`).then((value) => {
        setBlogs(value.data);

      });

    }, [])
    const filterClose = () =>{
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
    const handleFilterChange = (event) => {
      setFilterCriteria(event.target.value);
    };
    const search = () => {
      console.log("searching is clicking")
      setSearchAv(true);
      setSearchClick(search=>!search)
    };
  

    return (
        
        <div className="blog-container">
      <Navbar />
      <BlogNavbar userName={userNameParam} 
        toRefresh = {torefresh}
        />
  <div className="filter-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />

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
        <button onClick={filterClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
      </div>
      <div className="content blog-container">
        {searchAv ? (
          filteredBlog.map((blog, index) => (
            <BlogEntry key={index} blog={blog}  onEdit={() => handleEdit(blog.id)}
            onDelete={() => handleDelete(blog.id)}
            />
          ))
        ) : (
          blogs.map((blog, index) => (
            <BlogEntry key={index} blog={blog}  onEdit={() => handleEdit(blog.id)}
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
  <Footer/>
        </div>


    );
  }

  export default Blog;
