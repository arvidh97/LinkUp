import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/post';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ body }));
    setBody('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start a post"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;