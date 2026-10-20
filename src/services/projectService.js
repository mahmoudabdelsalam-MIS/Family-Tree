import { axiosInstance } from './axiosInstance';

export const projectService = {
  // جلب تفاصيل المشروع بواسطة الـ slug (مثل: /projects/silah)
  getProjectBySlug: async (slug) => {
    const response = await axiosInstance.get(`/projects/${slug}`);
    return response.data;
  },

  // جلب تفاصيل المشروع بواسطة الـ id
  getProjectById: async (id) => {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data;
  },
};