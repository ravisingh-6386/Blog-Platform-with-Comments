import { apiClient } from "./client";

export const fetchPosts = async () => {
  const { data } = await apiClient.get("/posts");
  return data;
};

export const fetchPostById = async (postId) => {
  const { data } = await apiClient.get(`/posts/${postId}`);
  return data;
};

export const createPost = async (payload) => {
  const { data } = await apiClient.post("/posts", payload);
  return data;
};

export const updatePost = async (postId, payload) => {
  const { data } = await apiClient.put(`/posts/${postId}`, payload);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await apiClient.delete(`/posts/${postId}`);
  return data;
};

export const createComment = async (postId, payload) => {
  const { data } = await apiClient.post(`/posts/${postId}/comments`, payload);
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await apiClient.delete(`/comments/${commentId}`);
  return data;
};
