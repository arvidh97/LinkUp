// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createPost } from '../store/post';

// const CreatePostForm = () => {
//   const dispatch = useDispatch();
//   const [body, setBody] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createPost({ body }));
//     setBody('');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Start a post"
//           required
//         />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePostForm;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createPost } from '../store/post';
// import Modal from 'react-modal';

// const CreatePostForm = () => {
//   const dispatch = useDispatch();
//   const [body, setBody] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(createPost({ body }));
//     setBody('');
//     closeModal();
//   };

//   return (
//     <div>
//       <textarea
//         onClick={openModal}
//         placeholder="Start a post"
//         required
//       />
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Create Post Modal"
//       >
//         <h2>Create Post</h2>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             placeholder="What do you want to talk about?"
//             required
//           />
//           <button type="submit">Post</button>
//           <button onClick={closeModal}>Cancel</button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default CreatePostForm;
import '../styles/PostFormModal.css'

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/post';
import Modal from 'react-modal';


const CreatePostForm = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
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
    setBody('');
    closeModal();
  };

  return (
    <div>
      <textarea
        onClick={openModal}
        placeholder="Start a post"
        required
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <div className="modal-header-title">
            <h2>Create Post</h2>
          </div>
          <button onClick={closeModal} className="modal-close-button">&times;</button>
        </div>
        <hr className="modal-separator" />
        <form onSubmit={handleSubmit}>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What do you want to talk about?"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Post</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePostForm;
