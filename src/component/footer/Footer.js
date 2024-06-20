import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>ABOUT US</h4>
                    <p>
                        We are a world travel blog featuring destinations, new experiences, and hidden places around the globe.
                        Please tag along on our journey.
                    </p>
                </div>
                <div className="footer-section">
                    <h4>QUICK LINKS</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Contact">Contact</a></li>

                    </ul>
                </div>
                <div className="footer-section">
                    <h4>FOLLOW US</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>CONTACT</h4>
                    <p>Email: info@travelblog.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
