import Modal from "react-modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser } from "../store/user";
import blankpropic from "../assests/blankProfilePic.png";
import "../styles/LikerModal.css";

const LikersModal = ({ likes, closeModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleProfileSend = async (e, likerId) => {
    e.preventDefault();
    await dispatch(fetchUser(likerId));
    const profileUrl = `/users/${likerId}`;
    history.push(profileUrl);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Like Modal"
      className="liker-modal"
    >
      <div className="likers-modal-container">
        <div className="likers-modal-content">
          <div className="likers-header">
            <h2>Reactions</h2>
            <button onClick={closeModal}>&times;</button>
          </div>
          <hr className="header-boarder" />
          <div className="likers-list">
            {likes &&
              Object.values(likes).map((like) => (
                <>
                  <div key={like.id} className="liker-item">
                    <img
                      src={like.liker.photoUrl || blankpropic}
                      alt={like.liker.fName}
                      className="liker-pic"
                      onClick={(e) => handleProfileSend(e, like.liker.id)}
                    />
                    <div
                      className="liker-details"
                      onClick={(e) => handleProfileSend(e, like.liker.id)}
                    >
                      <h3>{`${like.liker.fName} ${like.liker.lName}`}</h3>
                      <p>{like.liker.title}</p>
                    </div>
                  </div>
                  <hr className="likes-boarders" />
                </>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LikersModal;
