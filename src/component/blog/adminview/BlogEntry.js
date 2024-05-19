import React from 'react';
import './blogentry.css'; // Importing CSS file for styling

const BlogEntry = ({ onView, blog, onEdit, onDelete, home ,key }) => {
  const { category, shortDescription, image, title } = blog;
  const imageUrl = `http://localhost:3001/${image.replace(/\\/g, '/')}`;

  return (
    <div className="blog-card">
      <img className="blog-image" src={imageUrl} alt="Card image cap" />
      <div className="blog-details">
        <h2 className="blog-title">{category}</h2>
        <p className="blog-description">{title}</p>
        {home &&
        // <a href="#" className="blog-link">Read More</a>
        <button className = 'read-more'onClick = {onView}>Read More</button>}
        {!home &&
          <div className="actions">
            <button onClick={onEdit} className="edit-icon">&#9998; Edit</button>
            <button onClick={onDelete} className="delete-icon">&#128465; Delete</button>
          </div>
        }
      </div>
    </div>
  );
};

export default BlogEntry;
