import Navbar from "../navbar/Navbar"
import { useState } from "react";
import axios from "axios";
import './contact.css'
import Footer from "../footer/Footer";
const Contact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async(e) => {
        console.log("'working ")
        const data = {
            email:email,
            name:name,
            message:message
        }
        // e.preventDefault(); // Prevent the form from submitting normally
        await axios.post('http://localhost:3001/contact/', data)

        resetState()

    }
    const resetState = () => {
        console.log("this one is working ")
        setEmail('');
        setName('');
        setMessage('');
    };
    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <h2 className='contact'>CONTACT US</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" >Your Name</label>
                        <input
                            type="text"
                            id="username"
                            className="contact-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required // Add required attribute
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Your Email</label>
                        <input
                            type="text"
                            id="password"
                            className="contact-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required // Add required attribute
                        />
                                            <div className="input-group">

                        <label htmlFor="password">Your Messaage</label>
                        <textarea value={message} className="message-input-desc"     onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    </div>

                    <button type="submit">Submit</button>

                </form>
                
            </div>
            <Footer/>
        </div>
    )

}
export default Contact