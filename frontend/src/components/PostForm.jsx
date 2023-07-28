import "../styles/PostFormModal.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createPost } from "../store/post";
import blankprofile from "../assests/blankProfilePic.png";
import Modal from "react-modal";
import photoIcon from "../assests/photoIcon.png";
import videoIcon from "../assests/videoIcon.png";
import eventIcon from "../assests/eventIcon.png";
import articleIcon from "../assests/articleIcon.png";

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [body, setBody] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ body }));
    setBody("");
    closeModal();
  };

  const handleProfileSend = async (e) => {
    e.preventDefault();
    // await dispatch(fetchUser(post.author.id));
    const profileUrl = `/users/${sessionUser.id}`;
    history.push(profileUrl);
  };

  return (
    <div>
      <div className="feed-post-form">
        <div className="propic-text">
          <img
            src={sessionUser?.photoUrl || blankprofile}
            alt="Profile"
            className="propic-in-form"
            onClick={handleProfileSend}
          />
          <textarea
            onClick={openModal}
            placeholder="Start a post"
            className="post-form-textarea"
            readOnly
          />
        </div>
        <div className="post-form-bottom">
          <ul className="post-form-tools">
            <li className="photo-tool">
              <img src={photoIcon} alt="photo" />
              <p>Photo</p>
            </li>
            <li className="video-tool">
              <img src={videoIcon} alt="photo" />
              <p>Video</p>
            </li>
            <li className="event-tool">
              <img src={eventIcon} alt="photo" />
              <p>Event</p>
            </li>
            <li className="article-tool">
              <img src={articleIcon} alt="photo" />
              <p>Write an article</p>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <div className="modal-header-title">
            <h2>Create a Post</h2>
          </div>
          <button onClick={closeModal} className="modal-close-button">
            &times;
          </button>
        </div>
        <hr className="modal-separator" />
        <form onSubmit={handleSubmit}>
          <div className="textarea-container">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What do you want to talk about?"
              required
              className="modal-textarea"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="post-modal-buttons">
              Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePostForm;
