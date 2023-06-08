import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updatePost } from "../store/post";
import "../styles/EditPostModal.css";

const EditModal = ({ post, closeModal }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState(post.body);

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      body,
    };
    dispatch(updatePost(updatedPost));
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Update Post Modal"
      className="update-modal"
    >
      <div className="update-modal-header">
        <div className="update-modal-header-title">
          <h2>Edit Post</h2>
        </div>
        <button onClick={closeModal} className="update-modal-close-button">
          &times;
        </button>
      </div>
      <hr className="update-modal-separator" />
      <form onSubmit={handleSubmit}>
        <div className="textarea-container">
          <textarea
            name="body"
            value={body}
            onChange={handleBody}
            className="update-modal-textarea"
          />
        </div>
        <div className="update-modal-buttons">
          <button type="submit" className="post-modal-buttons">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
