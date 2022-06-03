import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AnonContext from "../auth/AnonContext";
import '../styles/Navigation.css';
import ColoredLine from "../common/ColoredLine";



function Navigation({ logout }) {
  const { anon } = useContext(AnonContext);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/new-post">
              Create Thread
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {anon.first_name || anon.anonname}
            </Link>
          </li>

        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/new-post">
              Create Post
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>

          {/* <li className="nav-item mr-4">
            <NavLink className='nav-link' to= '/file-upload'>
              Upload
            </NavLink>
          </li> */}

        </ul>
    );
  }

  return (
    <div className='navbar-extra'>
      <nav className="Navigation navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          A2
        </Link>
        {anon ? loggedInNav() : loggedOutNav()}
      </nav>
      {/* <ColoredLine color="white"/> */}
    </div>
  );
}

export default Navigation;


