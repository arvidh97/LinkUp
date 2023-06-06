import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost, fetchPosts } from '../store/post';
import PostItem from './PostItem';

function PostIndex() { 
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = Object.values(useSelector((state) => state.post));

    useEffect(() => {
        dispatch(fetchPosts());
      }, [dispatch]);

    // return (
    //     <div>
    //     {posts.reverse().map((post) => (
    //       <div key={post.id}>{post.body}{post.id}{post.author.fName}</div>
    //     ))}
    //   </div>
    // )
    return (
        <div>
            {posts.reverse().map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostIndex;
