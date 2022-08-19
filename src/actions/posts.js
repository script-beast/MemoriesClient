import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  STOP_LOADING,
} from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostBySearch = (search) => async (dispatch) => {
  console.log(search);
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: STOP_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
