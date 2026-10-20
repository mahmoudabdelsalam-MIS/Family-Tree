import {axiosInstance} from './axiosInstance';

export const servicesCatalogService = {
  getServicesCatalog: async (categoryId) => {
    const response = await axiosInstance.get('/services-catalog', {
    params: { categoryId }
    });
    return response.data;
  },

  getServicesList: async () => {
    const response = await axiosInstance.get('/services');
    return response.data;
  },

  getServiceDetail: async (serviceId) => {
    const response = await axiosInstance.get(`/services/${serviceId}`);
    return response.data;
  },
};