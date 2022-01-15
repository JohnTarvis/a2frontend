import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { user } = useContext(UserContext);
  console.debug("Homepage", "user=", user);

  return (
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">AnonAnon</h1>
          <p className="lead">Anonymous social networking</p>
          {user
              ? <h2>
                Welcome Back, {user.firstName || user.username}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}


export default Homepage;
