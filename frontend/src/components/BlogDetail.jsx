import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const BlogDetail = () => {
  const params = useParams();

  const [blog, setData] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const slug = params.id;
    fetch(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setComments(data.comments);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.id]);

  const createBlog = () => {
    return { __html: blog.content };
  };

  const capitalizerFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return "";
  };

  const slug = params.id;

  return (
    <div className="container mt-3">
      <h1 className="display-2">{blog.title}</h1>
      <p className="mt-4 text-muted fs-5">
        Category : {capitalizerFirstLetter(blog.category)}
      </p>
      <p className="mt-4 text-black-50 fs-5">
        {blog.month} {blog.day}
      </p>
      <div className="mt-5 mb-5" dangerouslySetInnerHTML={createBlog()} />

      <ul className="d-flex flex-column mb-5 p-4 bg-light rounded">
        <CommentForm slug={slug} />

        {comments.map((comment) => (
          <li
            key={comment.id}
            className="mt-4 p-2 d-flex justify-content-between align-items-center"
          >
            <div className="w-50">
              <strong className="text-muted">{comment.name}</strong> :{" "}
              <span className="text-black-50">{comment.content}</span>
            </div>
            <span className="text-black-50">
              published at : {comment.pub_date}
            </span>
          </li>
        ))}
      </ul>
      <hr />
      <p className="lead my-5">
        <Link to="/blog" className="fw-bold text-decoration-none">
          Back to Blogs
        </Link>
      </p>
    </div>
  );
};

export default BlogDetail;
