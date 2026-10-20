import React from 'react'
import SinglePodcastCard from '../shared/cards/SinglePodcastCard'
import PodcastDetails, { PodcastPageSkeleton } from './components/PodcastDetails'
import RelatedBlog, { RelatedPostsSkeleton } from './components/RelatedBlog'
import { useBlogDetail } from '../../hooks/useBlog';
import { useParams } from 'react-router-dom';
import { useBreadcrumbTitle } from '../../context/breadcrumb/BreadCrumbContext';

export default function SinglePodcast() {

  const { id } = useParams();
  const { data: response, isLoading, error } = useBlogDetail(id);
  const post = response?.data;
  useBreadcrumbTitle(error ? 'غير متاح' : post?.title);

  if (isLoading) {
    return (
      <div className='min-h-screen mt-10 flex flex-col gap-10 max-w-7xl mx-auto px-4'>
        <PodcastPageSkeleton />
        <RelatedPostsSkeleton />
      </div>
    );
  }

  if (error || !post) return <div className="text-center py-20 text-red-500" dir="rtl">تعذر تحميل البودكاست.</div>;

  return (
    <div className='min-h-screen mt-10 flex flex-col gap-10 max-w-7xl mx-auto px-4'>
      <SinglePodcastCard post={post}/>
      <PodcastDetails content={post.descriptionHtml} image={post.imageUrl}/>
      <RelatedBlog posts={post.relatedPosts} title="البودكاست"/>
    </div>
  )
}