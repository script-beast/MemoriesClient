import {
  FETCH_ALL,
  UPDATE,
  FETCH_BY_SEARCH,
  CREATE,
  DELETE,
  FETCH_POST,
  START_LOADING,
  STOP_LOADING,
} from "../constants/actionTypes";

export default (state = { loading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case FETCH_POST: {
      console.log(action.payload);
      return { ...state, post: action.payload };
    }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.totalPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};
