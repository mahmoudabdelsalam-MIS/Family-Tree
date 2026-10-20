import { axiosInstance } from './axiosInstance';

export const blogService = {
  getBlogs: async (params) => {
    //عشان هيستقبل منا params
    const response = await axiosInstance.get('/blogs', { params });
    return response.data;
  },

  BlogDetail: async (id) => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  },
};