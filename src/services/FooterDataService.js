import { axiosInstance } from './axiosInstance';

export const aboutCompanyService = {
  getAboutCompanyData: async () => {
    const response = await axiosInstance.get('/about-company');
    return response.data;
  },
};