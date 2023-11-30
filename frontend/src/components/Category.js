import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    const category = params.id;
    setCurrentCategory(capitalizeFirstLetter(category));

    fetch(`${process.env.REACT_APP_API_URL}/api/categories/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id]);

  const capitalizeFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return "";
  };

  const CorrectingImgSrc = (src) => {
    if (src) return "http://127.0.0.1:8000" + src;
    return "";
  };

  const getCategoryBlogs = () => {
    let list = [];
    let result = [];

    blogs.map((blogPost) => {
      return list.push(
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">
              {capitalizeFirstLetter(blogPost.category)}
            </strong>
            <h3 className="mb-0">{blogPost.title}</h3>
            <div className="mb-1 text-muted">
              {blogPost.month} {blogPost.day}
            </div>
            <p className="card-text mb-auto">{blogPost.excerpt}</p>
            <Link to={`/blog/${blogPost.slug}`} className="stretched-link">
              Continue reading
            </Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img
              width="300"
              height="300"
              src={CorrectingImgSrc(blogPost.thumbnail)}
              alt="thumbnail"
            />
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
          <div className="col-md-6">{list[i + 1] ? list[i + 1] : null}</div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="container mt-3">
      <h3 className="display-4">{currentCategory} Category</h3>
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
      {getCategoryBlogs()}
    </div>
  );
};

export default Category;
