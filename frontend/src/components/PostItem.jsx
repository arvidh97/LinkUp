import blankpropic from "../assests/blankProfilePic.png";
import "../styles/PostItem.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../store/post";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const currentUser = useSelector((state) => state.session.user);
  const { fName, lName } = post.author;
  const capitalizedFName = fName.charAt(0).toUpperCase() + fName.slice(1);
  const capitalizedLName = lName.charAt(0).toUpperCase() + lName.slice(1);

  const postCreatedAt = post.createdAt; // Replace with your actual post creation time

  const currentTime = new Date();
  const createdAt = new Date(postCreatedAt);

  // Calculate the difference in milliseconds
  const timeDifference = currentTime - createdAt;

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Create a function to format the time difference
  function formatTimeAgo(time) {
    if (time < 60) {
      return time + "s";
    } else if (time < 60 * 60) {
      return Math.floor(time / 60) + "m";
    } else if (time < 60 * 60 * 24) {
      return Math.floor(time / (60 * 60)) + "h";
    } else {
      return Math.floor(time / (60 * 60 * 24)) + "d";
    }
  }
  // Format the time difference
  const timeAgo = formatTimeAgo(seconds);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleUpdate = () => {
    // Logic for updating the post
    console.log("Update post");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(post.id));
    console.log("Delete post");
  };

  return (
    <div className="post-container">
      <div className="post-top">
        <div className="post-user-info">
          <img
            src={post.author.photoUrl || blankpropic}
            className="post-user-pic"
            alt="User"
          />
          <div className="user-details">
            <h2>
              {capitalizedFName} {capitalizedLName}
            </h2>
            <h3>{post.author.title}</h3>
            <h4>{timeAgo}</h4>
          </div>
        </div>
        {currentUser.id === post.author.id && (
          <div className="post-dropdown-container" ref={dropdownRef}>
            <button className="post-dropdown-btn" onClick={toggleDropdown}>
              ...
            </button>
            {isDropdownOpen && (
              <div className="post-dropdown-content">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-content">
        <p>{post.body}</p>
        {post.photoUrl && <img src={post.photoUrl} alt="Post" />}
      </div>
    </div>
  );
};

export default PostItem;
