import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NewsBlogs.css'; // Import your CSS file

function NewsBlogs() {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          const publishedBlogs = response.data.filter(blog => blog.status === 'Published');
          setBlogs(publishedBlogs);
        } else {
          console.error('Invalid response format: Expected an array');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="news-blog-section">
      <div className="section-header">
        <h2>Latest News and Blog</h2>
      </div>
      <div className="blog-container">
        <div className="blog-list">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <img src={`http://localhost:5000${blog.image}`} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <p className="blog-meta">By Admin on {new Date(blog.createdAt).toLocaleDateString()}</p>
                <h3 className="blog-title">{blog.title}</h3>
                {/* <p className="blog-description">{blog.content.substring(0, 100)}...</p> */}
                <button className="read-more-btn">Read More...</button>
              </div>
            </div>
          ))}
        </div>
        <div className="popular-stories">
          <h4>Popular Stories</h4>
          {blogs.slice(0, 3).map((blog) => (
            <div className="story-card" key={blog._id}>
              <h5 className="story-title">{blog.title}</h5>
              <p className="story-meta">By Admin on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsBlogs;