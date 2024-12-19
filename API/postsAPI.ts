import axiosInstance from './axiosInstance';

export const fetchAllPosts = (query?: string) => axiosInstance.get(`/api/posts?${query}`).then(({ data }) => data);

export const fetchPost = (query: string) => axiosInstance.get(`/api/posts?${query}`).then(({ data }) => data);
