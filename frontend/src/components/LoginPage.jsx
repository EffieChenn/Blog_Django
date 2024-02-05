import React, { useContext } from "react";
import "../css/login.css";
import AuthRequired from "./auth/AuthRequired";

const LoginPage = () => {
  let { loginUser } = useContext(AuthRequired);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Login</h2>
          <div className="text-center mb-5 text-dark">
            Log in and post something!
          </div>
          <div className="card my-5">
            <form
              onSubmit={loginUser}
              className="card-body cardbody-color p-lg-5"
            >
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  aria-describedby="emailHelp"
                  placeholder="username"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                />
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  className="btn btn-color px-5 mb-5 w-100"
                  placeholder="Login"
                />
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{" "}
                <a href="/login" className="text-dark fw-bold">
                  Create an Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
