import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/NewsBlogDetail.css'; 
import Header from '../Header';
import Footer from '../Footer';
import ImportantLinks from '../ImportantLinks';

function NewsBlogDetail() {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);
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

  // Fetch blog details by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Corrected URL
        const response = await axios.get(`http://localhost:5000/api/blogs/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="loading">Loading...</div>; // Show a loading state while fetching the blog
  }

  return (
    <>
      <Header />
      <div className="blog-detail-page">
        <div className="blog-content-container">
          <div className="blog-detail-container">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <span className="author">By Admin</span> | 
              <span className="date">Published on: {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Tags */}
            <div className="blog-tags">
              <strong>Tags:</strong>
              {blog.tags.length > 0 ? (
                blog.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>

            {/* Content */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>

        {/* Popular Stories Section */}
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
      <ImportantLinks/>
      <Footer />
    </>
  );
}

export default NewsBlogDetail;
