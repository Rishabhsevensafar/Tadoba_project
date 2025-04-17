import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/NewsBlogs.css'; // New CSS file name
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function NewsBlogs() {
  const [articles, setArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        
        if (Array.isArray(response.data)) {
          const publishedArticles = response.data.filter(article => article.status === 'Published');
          setArticles(publishedArticles);
        } else {
          console.error('Invalid response format: Expected an array');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const nextSlide = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const maxScroll = sliderRef.current.scrollWidth - slideWidth;
      const nextScrollPosition = Math.min(
        sliderRef.current.scrollLeft + slideWidth, 
        maxScroll
      );
      
      sliderRef.current.scrollTo({
        left: nextScrollPosition,
        behavior: 'smooth'
      });
      
      if (nextScrollPosition >= maxScroll) {
        setCurrentSlide(Math.ceil(maxScroll / slideWidth));
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const prevScrollPosition = Math.max(
        sliderRef.current.scrollLeft - slideWidth, 
        0
      );
      
      sliderRef.current.scrollTo({
        left: prevScrollPosition,
        behavior: 'smooth'
      });
      
      setCurrentSlide(Math.floor(prevScrollPosition / slideWidth));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="article-showcase">
      <div className="article-showcase__header">
        <h2 className="article-showcase__title">Latest News & Insights</h2>
        
        <div className="article-showcase__controls d-none d-md-flex">
          <button 
            className="article-showcase__control-btn" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="article-showcase__control-btn" 
            onClick={nextSlide}
            disabled={articles.length <= 4}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="article-showcase__container">
        <div className="article-showcase__featured" ref={sliderRef}>
          {articles.map((article) => (
            <div className="article-item" key={article.slug}>
              <div className="article-item__image-wrapper">
                <img 
                  src={`http://localhost:5000${article.image}`} 
                  alt={article.title} 
                  className="article-item__image" 
                />
              </div>
              <div className="article-item__content">
                <div className="article-item__meta">
                  <span className="article-item__author">
                   by {article.author?.name || "Editorial Team"}
                  </span>
                  <span className="article-item__date">
                    {formatDate(article.createdAt)}
                  </span>
                </div>
                <h3 className="article-item__title">{article.title}</h3>
                <Link 
                  to={`/news-blog/${article.slug}`} 
                  className="article-item__link"
                >
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsBlogs;