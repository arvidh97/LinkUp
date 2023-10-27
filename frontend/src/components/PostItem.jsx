import blankpropic from "../assests/blankProfilePic.png";
import "../styles/PostItem.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  updatePost,
  createLike,
  deleteLike,
  createComment,
  deleteComment,
} from "../store/post";
import EditModal from "./EditPostModal";
import LikersModal from "./LikersModal";
import Modal from "react-modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser } from "../store/user";
import bluelike from "../assests/blue-like.png";
import likebutton from "../assests/like.png";
import unlikebutton from "../assests/unlike.png";
import commentbutton from "../assests/comment.png";
import repost from "../assests/repeat.png";
import send from "../assests/send.png";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isCommentShown, setIsCommentShown] = useState(false);
  const [commentBody, setCommentBody] = useState("");

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

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openLikeModal = () => {
    setIsLikeModalOpen(true);
  };

  const closeLikeModal = () => {
    setIsLikeModalOpen(false);
  };

  const handleLikeButton = async (e) => {
    e.preventDefault();
    await dispatch(createLike(post.id, currentUser.id));
    dispatch(updatePost(post));
  };

  const handleUnlikeButton = async (e) => {
    e.preventDefault();
    const likedByCurrentUser = hasLikedPost(post.likes);
    if (likedByCurrentUser) {
      const likeId = likedByCurrentUser.id;
      await dispatch(deleteLike(post.id, likeId));
    }
    dispatch(updatePost(post));
  };

  const handleUpdate = () => {
    // Logic for updating the post
    openEditModal();
    setIsDropdownOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(post.id));
    setIsDropdownOpen(false);
  };

  const handleProfileSend = async (e) => {
    e.preventDefault();
    await dispatch(fetchUser(post.author.id));
    const profileUrl = `/users/${post.author.id}`;
    history.push(profileUrl);
  };

  const handleCommentProfileSend = async (authorId) => {
    await dispatch(fetchUser(authorId));
    history.push(`/users/${authorId}`);
  };

  const toggleCommentForm = () => {
    setIsCommentShown(true);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await dispatch(createComment(post.id, commentBody));
    dispatch(updatePost(post));
    setCommentBody("");
  };

  function likeCount(likes) {
    const count = Object.keys(likes).length;
    if (count === 0) {
      return null;
    }
    return (
      <div className="like-counts" onClick={openLikeModal}>
        <img className="blue-like-icon" src={bluelike} alt="bluelike" />
        <h3> {count} </h3>
      </div>
    );
  }

  function hasLikedPost(likes) {
    if (!likes) return false;
    const likedByCurrentUser = Object.values(likes).some(
      (like) => like.likerId === currentUser.id
    );
    return likedByCurrentUser;
  }

  function renderComments() {
    if (!post.comments) return null;

    const length = Object.keys(post.comments).length;
    const commentAmount = length === 1 ? "comment" : "comments";

    return (
      <div className="comment-counts" onClick={toggleCommentForm}>
        {length} {commentAmount}
      </div>
    );
  }

  return (
    <div className="post-container">
      <div className="post-top">
        <div className="post-user-info">
          <img
            src={post.author.photoUrl || blankpropic}
            className="post-user-pic"
            alt="User"
            onClick={handleProfileSend}
          />
          <div className="user-details">
            <h2 onClick={handleProfileSend}>
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
        <div className="post-text">
          <p>{post.body}</p>
        </div>
        {post.photoUrl && <img src={post.photoUrl} alt="Post" />}
      </div>
      <div className="like-comment-section">
        <div className="like-comment-counter">
          {post.likes ? likeCount(post.likes) : <div></div>}
          {post.comments ? renderComments() : <div></div>}
        </div>
        <hr />
        <div className="post-buttons">
          {hasLikedPost(post.likes) ? (
            <button
              onClick={handleUnlikeButton}
              className="action-unlike-button"
            >
              <img src={unlikebutton} alt="likedicon" /> <h2>Like</h2>
            </button>
          ) : (
            <button onClick={handleLikeButton} className="action-like-button">
              <img src={likebutton} alt="likeicon" /> <h2>Like</h2>
            </button>
          )}
          <button onClick={toggleCommentForm} className="action-comment-button">
            <img src={commentbutton} alt="commenticon" /> <h2>Comment</h2>
          </button>
          <button className="action-repost-button">
            <img src={repost} alt="reposticon" /> <h2>Repost</h2>
          </button>
          <button className="action-comment-button">
            <img src={send} alt="sendicon" /> <h2>Send</h2>
          </button>
        </div>
        {isCommentShown && (
          <>
            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="pro-comment-form">
                <img
                  src={currentUser.photoUrl || blankpropic}
                  className="comment-pro-pic"
                />
                <textarea
                  rows="3"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Add a comment..."
                  required
                />
              </div>
              {commentBody !== "" ? <button type="submit">Post</button> : null}
            </form>
            <div className="comments-container">
              {Object.values(post.comments).map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img
                    src={comment.author.photoUrl || blankpropic}
                    className="comment-user-pic"
                    alt="User"
                    onClick={() => handleCommentProfileSend(comment.author.id)}
                  />
                  <div className="comment-details">
                    <h2
                      onClick={() =>
                        handleCommentProfileSend(comment.author.id)
                      }
                    >
                      {comment.author.fName} {comment.author.lName}
                    </h2>
                    <h3>{comment.author.title}</h3>
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {isEditModalOpen && (
        <Modal
          isOpen={true}
          onRequestClose={closeEditModal}
          className="update-modal-inpost"
        >
          <h2>Edit Post</h2>
          <EditModal post={post} closeModal={closeEditModal} />
        </Modal>
      )}
      {isLikeModalOpen && (
        <Modal
          isOpen={true}
          onRequestClose={closeLikeModal}
          className="likers-modal-inpost"
        >
          <LikersModal likes={post.likes} closeModal={closeLikeModal} />
        </Modal>
      )}
    </div>
  );
};

export default PostItem;
