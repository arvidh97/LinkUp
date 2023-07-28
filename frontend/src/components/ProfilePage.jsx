import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/user";
import { useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import blankpropic from "../assests/blankProfilePic.png";
import pineapple from "../assests/pineapple-banner.png";
import NavBar from "./NavBar";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  const user = users[userId];

  if (!user) {
    return <div>Loading...</div>; // Add a loading state while the user data is being fetched
  }

  const capitalizedFName =
    user.fname.charAt(0).toUpperCase() + user.fname.slice(1);
  const capitalizedLName =
    user.lname.charAt(0).toUpperCase() + user.lname.slice(1);
  const userName = capitalizedFName + " " + capitalizedLName;

  return (
    <>
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="profile-page">
        <header className="profile-header">
          <img
            className="cover-picture"
            src={user.coverUrl || pineapple}
            alt="Cover"
          />
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={user.photoUrl || blankpropic}
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{userName}</h1>
            <h3 className="profile-title">{user.title}</h3>
            <p className="profile-location">{user.location}</p>
          </div>
        </header>
        <div className="profile-summary">
          <h4 className="summary-heading">About</h4>
          <p className="summary-content">{user.bio}</p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
