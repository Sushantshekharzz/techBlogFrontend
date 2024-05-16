
import './blognavbar.css'
// import AddBlog from './AddBlog' 
import AddBlog from './addblog/AddBlog'
    import { useState } from 'react'

function BlogNavbar(props) {
    const [addBlog, setAddBlog] = useState(false)

    const CreateBlog = () =>{
        setAddBlog(true)

    }
    const handleAddSuccess = () =>{
        props.toRefresh()
    }
    return (
        <nav>
        <div className="container">
            <div className="left-section">
                <span className="user-name">Welcome, {props.userName} </span>
            </div>
            <div className="right-section">
                <button className="create-btn" onClick={CreateBlog}>Create</button>
            </div>
        </div>
        <AddBlog
                        onAddSuccess={handleAddSuccess} // Pass callback function

        isOpen= {addBlog}
        onRequestClose={() => setAddBlog(false)}
        userName = {props.userName}

        />
    </nav>
    );
  }
  
  export default BlogNavbar;
  