import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/blog/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, [blogs]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/blog/featured/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeaturedBlog(data[0]);
      });
  }, []);

  const capitalizerFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return "";
  };

  const getBlog = () => {
    let list = [];
    let result = [];

    blogs.map((blogPost) => {
      list.push(
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col w-50 p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">
              {capitalizerFirstLetter(blogPost.category)}
            </strong>
            <h3 className="mb-0">{blogPost.title}</h3>
            <div className="mb-1 text-muted">
              {blogPost.month} {blogPost.day}
            </div>
            <p className="card-text mb-auto">{blogPost.excerpt}</p>
            <Link
              to={`/blog/${blogPost.slug}`}
              className="stretched-link text-decoration-none fw-bold mt-4"
            >
              Continue reading
            </Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img
              title="thumbnail"
              width="300"
              height="300"
              src={blogPost.thumbnail}
              alt="thumbnail"
              className="img-thumbnail"
            />
          </div>
        </div>
      );
      return list;
    });

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className="row mb=2">
          <div className="col-md-6">{list[i]}</div>
          <div className="col-md-6">{list[i + 1] ? list[i + 1] : null}</div>
        </div>
      );
    }
    return result;
  };

  return (
    <div className="container mt-3">
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/world"
          >
            World
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/entertainment"
          >
            Entertainment
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/technology"
          >
            Technology
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/design"
          >
            Design
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/local"
          >
            Local
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/business"
          >
            Business
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/health"
          >
            Health
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/science"
          >
            Science
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/weather"
          >
            Weather
          </Link>
          <Link
            className="p-2 link-secondary text-decoration-none"
            to="/category/sports"
          >
            Sports
          </Link>
        </nav>
      </div>
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
          <p className="lead my-3">{featuredBlog.excerpt}</p>
          <p className="lead mb-0">
            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="text-white fw-bold text-decoration-none"
            >
              Continue reading...
            </Link>
          </p>
        </div>
      </div>
      {getBlog()}
    </div>
  );
};

export default Blog;
