import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import logo from '../assests/LinkUpLogo.png';
import blankprofile from '../assests/blankProfilePic.png'
import * as sessionActions from '../store/session';
import { Redirect, Link } from 'react-router-dom';
import '../styles/NavBar.css'

function NavBar() {
    const dispatch = useDispatch(); 
    const [dropdown, setDropdown] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
      };

      const handleLogout = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.logout())
    }

    return (
        <div className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo" />
            {/* NEED TO HAVE A HANDLE SEARCH FUNCTIONALITY*/}
            <input type="text" placeholder="Search" className="search-input" />
          </div>
    
          <div className="navbar-right">
            <div className="dropdown">
              <button className="dropdown-button" onClick={toggleDropdown}>
              <img
              src={sessionUser?.photoUrl || blankprofile}
              alt="Profile"
              className="profile-image"
            />
              </button>
              {dropdown && (
                <div className="dropdown-content">
                   <ul>
                {sessionUser && (
                  <li>
                    <h2>Welcome, {sessionUser.fname}!</h2>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

export default NavBar;
    
