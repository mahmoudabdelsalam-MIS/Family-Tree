import { axiosInstance } from './axiosInstance';

export const aboutService = {
  getAboutPageData: async () => {
    const response = await axiosInstance.get('/about');
    return response.data;
  },
};