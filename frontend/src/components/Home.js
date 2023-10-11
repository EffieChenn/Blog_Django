import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-light rounded-3 mt-5">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to BlogBlog</h1>
          <p className="col-md-8 fs-4">
            We make all kinds of articles about various topics.
          </p>
          <hr className="my-4" />
          <p className="col-md-8 fs-5">Click the button below to check out!</p>
          <Link className="btn btn-primary btn-lg" type="button" to={"/blog"}>
            Check out our Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
