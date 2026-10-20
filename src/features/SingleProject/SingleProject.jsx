import React from 'react';
import MainApp from './components/MainApp';
import FeaturesSingleApp from './components/FeaturesSingleApp';
import ScreenShotsApp from './components/ScreenShotsApp';
import BookingFlow from '../booking/BookingFlow';
import { useParams } from 'react-router-dom';
import { useProjectBySlug } from '../../hooks/useProject';
import { useBreadcrumbTitle } from '../../context/breadcrumb/BreadCrumbContext';
import MainAppSkeleton from '../shared/skeleton/MainAppSkeleton';

export default function SingleProject() {
  const { slug } = useParams();
  const { data: response, isLoading, error } = useProjectBySlug(slug);

  const project = response?.data || {};

  
  

  if (isLoading) {
    return <MainAppSkeleton />
  }

  if (error || !response?.success || !response?.data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 font-semibold">
        عذراً، تعذر العثور على تفاصيل هذا المشروع.
      </div>
    );
  }

  return (
    <div>
      <MainApp data={project} />
      <FeaturesSingleApp subtitle={project.subtitle} features={project.features || []} />
      <ScreenShotsApp title={project.title || ''} galleryUrls={project.galleryUrls || []} />
      <BookingFlow />
    </div>
  );
}