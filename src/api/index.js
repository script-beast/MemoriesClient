import axios from "axios";

const api = axios.create({
  baseURL: "https://mymemoriesserver.onrender.com/",
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => api.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (search) =>
  api.get(
    `/posts/search?search=${search.search || "none"}&tags=${
      search.tags || "none"
    }`
  );
export const fetchPost = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post("/posts", post);
export const updatePost = (id, post) => api.patch(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const likePost = (id) => api.patch(`/posts/${id}/like`);

export const signin = (user) => api.post("/users/signin", user);
export const signup = (user) => api.post("/users/signup", user);
