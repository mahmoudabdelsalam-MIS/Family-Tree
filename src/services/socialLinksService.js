import { axiosInstance } from './axiosInstance';

export const socialLinksService = {
  getSocialLinksData: async () => {
    const response = await axiosInstance.get('/social-links');
    return response.data;
  },
};