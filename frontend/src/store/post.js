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
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data)
        // const post = data.post;
        dispatch(receivePost(data))
    }
};

export const fetchPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/posts');
    if (res.ok) {
        const data = await res.json();
        // const posts = data.post;
        dispatch(receivePosts(data));
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

export const updatePost = (post) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    if (response.ok) {
        const data = await response.json();
        const post = data.post;
        dispatch(receivePost(post))
    }
};

const postsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_POSTS:
            // return { ...nextState, ...action.posts };
            return action.posts
        case RECEIVE_POST:
            nextState[action.post.id] = action.post;
            return nextState
        case REMOVE_POST:
            debugger
            delete nextState[action.postId];
            return nextState;
            debugger
            // return state
        default:
            return state;
    }
}

export default postsReducer;