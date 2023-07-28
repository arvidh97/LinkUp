import { csrfFetch } from "./csrf.js";

export const RECEIVE_POST = "posts/RECEIVE_POST";
export const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
export const REMOVE_POST = "posts/REMOVE_POST";
export const LIKE_POST = "posts/LIKE_POST";
export const UNLIKE_POST = "post/UNLIKE_POST";

export const receivePost = (post) => {
  return {
    type: RECEIVE_POST,
    post,
  };
};
export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};
export const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId,
  };
};
export const likePost = (postId, like) => {
  return {
    type: LIKE_POST,
    postId,
    like,
  };
};
export const unlikePost = (postId) => {
  return {
    type: UNLIKE_POST,
    postId,
  };
};

export const createPost = (post) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (res.ok) {
    const data = await res.json();
    // const post = data.post;
    dispatch(receivePost(data));
  }
};

export const fetchPosts = () => async (dispatch) => {
  const res = await csrfFetch("/api/posts");
  if (res.ok) {
    const data = await res.json();
    // const posts = data.post;
    dispatch(receivePosts(data.posts));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removePost(postId));
  }
};

export const updatePost = (post) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(receivePost(data));
  }
};

export const createLike = (postId, likerId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liker_id: likerId }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(likePost(postId, data));
  }
};

export const deleteLike = (postId, likeId) => async (dispatch) => {
  const res = await csrfFetch(`api/posts/${postId}/likes/${likeId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(unlikePost(postId));
  }
};

const postsReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...nextState, ...action.posts };
    // return action.posts
    case RECEIVE_POST:
      nextState[action.post.id] = action.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.postId];
      return nextState;
    case LIKE_POST:
      const { postId, like } = action;
      if (nextState[postId]) {
        nextState[postId].likes = nextState[postId].likes || {};
        nextState[postId].likes[like.id] = like;
      }
      return nextState;
    case UNLIKE_POST:
      if (nextState[action.postId] && nextState[action.postId].likes) {
        delete nextState[action.postId].likes[action.likeId];
      }
      return nextState;
    default:
      return state;
  }
};

export default postsReducer;
