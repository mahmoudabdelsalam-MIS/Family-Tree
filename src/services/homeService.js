import { axiosInstance } from './axiosInstance';

export const homeService = {
  getHomeData: async () => {
    const response = await axiosInstance.get('/home');
    return response.data;
  },

  getServiceCategories: async () => {
    const response = await axiosInstance.get('/service-categories');
    return response.data;
  },

  getClientReviews: async () => {
    const response = await axiosInstance.get('/client-reviews');
    return response.data;
  },
};