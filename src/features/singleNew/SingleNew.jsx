import React from 'react'
import RelatedBlog, { RelatedPostsSkeleton } from '../singlePodcast/components/RelatedBlog'
import NewsDetails, { NewsDetailsSkeleton } from './components/NewsDetails'
import { useParams } from 'react-router-dom';
import { useBlogDetail } from '../../hooks/useBlog';

export default function SingleNew() {
  const { id } = useParams();
  const { data: response, isLoading, error } = useBlogDetail(id);
  const post = response?.data;
  if (isLoading) {
    return (
      <>
        <NewsDetailsSkeleton />
        <RelatedPostsSkeleton />
      </>
    );
  }

  if (error || !post) return <div className="text-center py-20 text-red-500 font-semibold" dir="rtl">عذراً، تعذر تحميل الخبر.</div>;
  const images = [post.imageUrl, ...(post.galleryUrls || [])].filter(Boolean);

  return (
    <>
      <NewsDetails
        title={post.title}
        date={post.date}
        time={post.publishedTime}
        images={images}
        content={post.descriptionHtml}
      />
      <RelatedBlog posts={post.relatedPosts} title="الأخبار"/>
    </>
  )
}