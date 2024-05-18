import React from 'react';
import './blogentry.css'; // Importing CSS file for styling

const BlogEntry = ({ blog, onEdit, onDelete, home }) => {
  const { category, longDescription, shortDescription, title } = blog;
  const image = blog.image.replace(/\\/g, '/'); // Replace backslashes with forward slashes
  const baseUrl = 'http://localhost:3001/';
  const imageUrl = baseUrl + image;

  return (
    <div className="blog-entry">
      <div className="blog-image-container">
        <img src={imageUrl} alt={title} className="blog-image" />
      </div>
      <div className="content-container">
        <div className="field">
          <label>Destination</label>
          <div className="value">{category}</div>
        </div>
        <div className="field">
          <label>Title:</label>
          <div className="value">{title}</div>
        </div>
        <div className="field">
          <label>Short Description:</label>
          <div className="value">{shortDescription}</div>
        </div>
        <div className="field">
          <label>Long Description:</label>
          <div className="value">{longDescription}</div>
        </div>
        {!home &&
          <div className="actions">
            <span onClick={onEdit} className="edit-icon">&#9998; Edit</span>
            <span onClick={onDelete} className="delete-icon">&#128465; Delete</span>
          </div>
        }
      </div>
    </div>
  );
};

export default BlogEntry;
