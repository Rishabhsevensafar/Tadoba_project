import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/NewsBlogDetail.css";
import Header from "../Header";
import Footer from "../Footer";
import ImportantLinks from "../ImportantLinks";
import { Helmet } from "react-helmet";

function NewsBlogDetail() {
  const { slug } = useParams();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsRes, blogRes] = await Promise.all([
          axios.get("http://localhost:5000/api/blogs"),
          axios.get(`http://localhost:5000/api/blogs/slug/${slug}`),
        ]);

        if (Array.isArray(blogsRes.data)) {
          setBlogs(blogsRes.data.filter((b) => b.status === "Published"));
        }
        setBlog(blogRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{blog.metaTitle || blog.title}</title>
        <meta
          name="description"
          content={
            blog.metaDescription ||
            blog.content?.replace(/<[^>]+>/g, "").slice(0, 150)
          }
        />
      </Helmet>

      <Header />
      <div className="blog-detail-page">
        <main className="blog-main-content">
          <article className="blog-article">
            <header className="blog-header">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-meta">
                <span className="author">
                  By {blog.author?.name || "Admin"}
                </span>

                <span className="separator">|</span>
                <span className="date">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </header>



            <div className="blog-tags">
              {blog.tags?.length > 0 ? (
                <>
                  <strong>Tags: </strong>
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </>
              ) : null}
            </div>
            {blog.image && (
              <div className="featured-image">
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                />
              </div>
            )}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </main>

        <aside className="blog-sidebar">
          <div className="popular-stories">
            <h3 className="sidebar-title">Popular Stories</h3>
            <div className="stories-list">
              {blogs
                .filter((b) => b._id !== blog._id)
                .slice(0, 5)
                .map((blog) => (
                  <a
                    href={`/news-blog/${blog.slug}`}
                    key={blog._id}
                    className="story-card-horizontal"
                  >
                    {blog.image && (
                      <div className="story-thumb">
                        <img
                          src={`http://localhost:5000${blog.image}`}
                          alt={blog.title}
                        />
                      </div>
                    )}
                    <div className="story-info">
                      <h4 className="story-title">{blog.title}</h4>
                      <p className="story-meta">
                        Updated on{" "}
                        {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        by {blog.author?.name || "Admin"}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </aside>
      </div>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default NewsBlogDetail;
