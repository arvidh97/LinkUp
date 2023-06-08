import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import NavBar from "./NavBar";
import PostForm from "./PostForm";
import PostIndex from "./PostIndex";
import "../styles/Feed.css";

function Feed() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.logout());
  };

  if (!sessionUser) return <Redirect to="/" />;
  return (
    <div className="full-page">
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="feed-container">
        <div className="left-div">
          <div className="feed-profile-badge">
            <div className="feed-profile-badge-cover"></div>
            <div className="feed-profile-badge-propic">
              <img src={sessionUser.photoUrl} className="badge-propic" />
            </div>
          </div>
        </div>
        <div className="center-container">
          <div className="form-container">
            <PostForm />
          </div>
          <div className="border"></div>
          <div className="post-index-container">
            <PostIndex />
          </div>
        </div>
        <div className="right-div"></div>
      </div>
    </div>
  );
}

export default Feed;
