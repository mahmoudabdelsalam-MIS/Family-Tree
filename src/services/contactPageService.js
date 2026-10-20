import { axiosInstance } from './axiosInstance';

export const contactService = {
  getContactPageData: async () => {
    const response = await axiosInstance.get('/contact');
    return response.data;
  },
};