import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/user";
import { useEffect } from "react";
import blankpropic from "../assests/blankProfilePic.png";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const user = users[userId];

  //   const capitalizedFName =
  //     user.fname.charAt(0).toUpperCase() + user.fname.slice(1);
  //   const capitalizedLName =
  //     user.lname.charAt(0).toUpperCase() + user.lname.slice(1);
  //   const userName = capitalizedFName + " " + capitalizedLName;
  return (
    <div className="profile-page">
      <header className="profile-header">
        <img
          className="profile-picture"
          src={user.photoUrl || blankpropic}
          alt="Profile"
        />
        <h1 className="profile-name">{user.fname}</h1>
        <h3 className="profile-title">{user.title}</h3>
        <p className="profile-location">{user.location}</p>
        <div className="profile-summary">
          <h4>Bio</h4>
          <p>{user.bio}</p>
        </div>
      </header>
    </div>
  );
}

export default ProfilePage;
