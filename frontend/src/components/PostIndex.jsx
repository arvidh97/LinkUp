import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPosts } from '../store/post';

function PostIndex() { 
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = Object.values(useSelector((state) => state.post));

    useEffect(() => {
        dispatch(fetchPosts());
      }, [dispatch]);

    return (
        <div>
        {posts.reverse().map((post) => (
          <div key={post.id}>{post.body}</div>
        ))}
      </div>
    )
}

export default PostIndex;
