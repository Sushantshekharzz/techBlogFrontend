
import './blognavbar.css'
import { Link, useNavigate } from "react-router-dom";

import AddBlog from './addblog/AddBlog'
import { useState } from 'react'

function BlogNavbar(props) {
    const [addBlog, setAddBlog] = useState(false)
    const navigate = useNavigate();

    const CreateBlog = () => {
        setAddBlog(true)

    }
    const handleAddSuccess = () => {
        props.toRefresh()
    }
    const back = () => {
        navigate("/")
    }
    return (
        <nav className="blog-navbar">
            <div className="container">
                <div className="left-section">
                    <button className='back-btn' onClick={back}>BACK</button>
                    <span className="user-name">Welcome, {props.userName} </span>
                </div>
                <div className="right-section">
                    <button className="create-btn" onClick={CreateBlog}>Create</button>
                </div>
            </div>
            <AddBlog
                onAddSuccess={handleAddSuccess} // Pass callback function

                isOpen={addBlog}
                onRequestClose={() => setAddBlog(false)}
                userName={props.userName}

            />
        </nav>
    );
}

export default BlogNavbar;
