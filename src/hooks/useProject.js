import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';

// Hook لجلب تفاصيل المشروع بواسطة الـ slug
export const useProjectBySlug = (slug) => {
  return useQuery({
    queryKey: ['project', 'slug', slug],
    queryFn: () => projectService.getProjectBySlug(slug),
    enabled: !!slug, // لا يتم تنفيذ الطلب إلا إذا كان الـ slug موجوداً
    staleTime: 1000 * 60 * 10,
  });
};

// Hook لجلب تفاصيل المشروع بواسطة الـ id
export const useProjectById = (id) => {
  return useQuery({
    queryKey: ['project', 'id', id],
    queryFn: () => projectService.getProjectById(id),
    enabled: !!id, // لا يتم تنفيذ الطلب إلا إذا كان الـ id موجوداً
    staleTime: 1000 * 60 * 10,
  });
};