
import './blognavbar.css'
import { Link, useNavigate } from "react-router-dom";

import AddBlog from '../addblog/AddBlog'
import { useEffect, useState } from 'react'
import axios
 from 'axios';

function BlogNavbar(props) {

    const userId = props.userId
    const [addBlog, setAddBlog] = useState(false)
    const [userName,setUserName]  = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        
        axios.get(`http://localhost:3001/user/?id=${userId}`).then((value) => {            
            setUserName(value.data.name)
        })
        },[])
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
                    <span className="user-name">Welcome, {userName} </span>
                </div>
                <div className="right-section">
                    <button className="create-btn" onClick={CreateBlog}>Create</button>
                </div>
            </div>
            <AddBlog
                onAddSuccess={handleAddSuccess} // Pass callback function

                isOpen={addBlog}
                onRequestClose={() => setAddBlog(false)}
                userId={userId}

            />
        </nav>
    );
}

export default BlogNavbar;
