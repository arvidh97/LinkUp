import {csrfFetch} from "./csrf.js";

export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const REMOVE_POST = 'posts/REMOVE_POST';

export const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post
    }
};
export const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    }
};
export const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    }
};

export const createPost = (post) => async (dispatch) => {
    const payload = { post: post }
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (res.ok) {
        const data = await res.json();
        const post = data.post;
        dispatch(receivePost(post))
    }
};

export const deletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removePost(postId))
    }
};

const postsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...nextState, ...action.posts };
        case RECEIVE_POST:
            nextState[action.post.id] = action.post;
            return nextState
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        default:
            return state;
    }
}

export default postsReducer;