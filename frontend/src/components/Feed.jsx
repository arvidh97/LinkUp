// import * as sessionActions from "../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { Redirect, Link } from "react-router-dom";
// import NavBar from "./NavBar";
// import PostForm from "./PostForm";
// import PostIndex from "./PostIndex";
// import "../styles/Feed.css";
// import arvid from "../assests/arvid-pic.jpeg";
// import blankprofile from "../assests/blankProfilePic.png";

// function Feed() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const history = useHistory();
//   const handleLogout = (e) => {
//     e.preventDefault();
//     return dispatch(sessionActions.logout());
//   };

//   const handleProfileSend = (e) => {
//     e.preventDefault();
//     const profileUrl = `/users/${sessionUser.id}`;
//     history.push(profileUrl);
//   };

//   if (!sessionUser) return <Redirect to="/" />;
//   return (
//     <div className="full-page">
//       <div className="nav-bar">
//         <NavBar />
//       </div>
//       <div className="feed-container">
//         <div className="left-div">
//           <div className="feed-profile-badge">
//             <div className="feed-profile-badge-cover"></div>
//             <div className="feed-profile-badge-propic">
//               <img
//                 src={sessionUser.photoUrl || blankprofile}
//                 className="badge-propic"
//                 onClick={handleProfileSend}
//               />
//             </div>
//             <div className="feed-profile-user-info">
//               <h2 className="session-user-name" onClick={handleProfileSend}>
//                 {sessionUser.fname} {sessionUser.lname}
//               </h2>
//               <h3>
//                 {sessionUser.title ||
//                   "Go to your profile and let the world know your title!"}
//               </h3>
//             </div>
//           </div>
//         </div>
//         <div className="center-container">
//           <div className="form-container">
//             <PostForm />
//           </div>
//           <div className="border"></div>
//           <div className="post-index-container">
//             <PostIndex />
//           </div>
//         </div>
//         <div className="right-div">
//           <div className="about-the-dev">
//             <div className="about-the-dev-header">
//               <h2>About The Developer</h2>
//               <hr></hr>
//             </div>
//             <div className="about-the-dev-content">
//               <img src={arvid} alt="Handsome Beast" className="dev-pic" />
//               <p>
//                 <span className="my-name">Arvid Hossain</span>, born and bred
//                 from NYC, is an all guns blazing kind of coder. Putting his
//                 heart, brain, and tears, he would humbly like to welcome you to
//                 his very own LinkedIn Clone. Please check his GitHub and
//                 LinkedIn links below, and enjoy{" "}
//               </p>
//             </div>
//           </div>
//           <div className="dev-links"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feed;

import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import NavBar from "./NavBar";
import PostForm from "./PostForm";
import PostIndex from "./PostIndex";
import "../styles/Feed.css";
import arvid from "../assests/arvid-pic.jpeg";
import blankprofile from "../assests/blankProfilePic.png";
import github from "../assests/githublogo.png";
import linkedin from "../assests/linkedInlogo.png";

function Feed() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.logout());
  };

  const handleProfileSend = (e) => {
    e.preventDefault();
    const profileUrl = `/users/${sessionUser.id}`;
    history.push(profileUrl);
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
              <img
                src={sessionUser.photoUrl || blankprofile}
                className="badge-propic"
                onClick={handleProfileSend}
              />
            </div>
            <div className="feed-profile-user-info">
              <h2 className="session-user-name" onClick={handleProfileSend}>
                {sessionUser.fname} {sessionUser.lname}
              </h2>
              <h3>
                {sessionUser.title ||
                  "Go to your profile and let the world know your title!"}
              </h3>
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
        <div className="right-div">
          <div className="about-the-dev">
            <div className="about-the-dev-header">
              <h2>About The Developer</h2>
              <hr></hr>
            </div>
            <div className="about-the-dev-content">
              <img src={arvid} alt="Handsome Beast" className="dev-pic" />
              <p>
                <span className="my-name">Arvid Hossain</span>, born and bred
                from NYC, is an all guns blazing kind of coder. Putting his
                heart, brain, and tears, he would humbly like to welcome you to
                his very own LinkedIn Clone. Please check his GitHub and
                LinkedIn links below, and enjoy{" "}
              </p>
            </div>
          </div>
          <div className="about-the-dev">
            <div>
              <a href="https://github.com/arvidh97/LinkUp">
                <img src={github} alt="github" className="git-img" />
              </a>
              <a href="https://www.linkedin.com/in/arvid-hossain-71576017a/">
                <img src={linkedin} alt="linkedin" className="link-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
