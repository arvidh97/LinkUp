import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assests/upLogo.png";
import blankprofile from "../assests/blankProfilePic.png";
import * as sessionActions from "../store/session";
import { Redirect, Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useHistory } from "react-router-dom";
import magGlass from "../assests/magGlass.png";
import homeIcon from "../assests/homeIcon.png";
import connectionsIcon from "../assests/connectionsIcon.png";
import jobsIcon from "../assests/jobsIcon.png";
import { fetchUser } from "../store/user";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const sessionUser = useSelector((state) => state.session.user);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.logout());
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.reload();
    return history.push("/feed");
  };

  const handleProfileSend = (e) => {
    e.preventDefault();
    dispatch(fetchUser(`${sessionUser.id}`));
    const profileUrl = `/users/${sessionUser.id}`;
    history.push(profileUrl);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" onClick={handleClick} />
        {/* NEED TO HAVE A HANDLE SEARCH FUNCTIONALITY*/}
        <div className="search-container">
          <img src={magGlass} className="search-icon" alt="Search" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="navbar-right">
        <ul className="primary-nav-items">
          <li>
            <Link to="/feed" className="nav-links">
              <img src={homeIcon} alt="Home" className="nav-icon" />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/connections" className="nav-links">
              <img
                src={connectionsIcon}
                alt="Connections"
                className="nav-icon"
              />
              <p>My Network</p>
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-links">
              <img src={jobsIcon} alt="Jobs" className="nav-icon" />
              <p>Jobs</p>
            </Link>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropdown-button" onClick={toggleDropdown}>
                <img
                  src={sessionUser?.photoUrl || blankprofile}
                  alt="Profile"
                  className="profile-image"
                />
              </button>
              {dropdown && (
                <div className="dropdown-content" ref={dropdownRef}>
                  <ul>
                    {sessionUser && (
                      <li className="drop-badge">
                        <div className="pic-name">
                          <div>
                            <img
                              src={sessionUser?.photoUrl || blankprofile}
                              alt="Profile"
                              className="profile-drop"
                            />
                          </div>
                          <div className="user-info">
                            <h2 className="name-drop">
                              {sessionUser.fname} {sessionUser.lname}
                            </h2>
                            <h3>{sessionUser.title}</h3>
                          </div>
                        </div>
                        <div className="profile-actions">
                          <button
                            className="view-profile-button"
                            onClick={handleProfileSend}
                          >
                            View Profile
                          </button>
                        </div>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout} className="drop-logout">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
