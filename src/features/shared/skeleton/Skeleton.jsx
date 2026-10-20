import React from 'react';

export default function Skeleton({ className = '', rounded = 'rounded-2xl' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse motion-reduce:animate-none bg-gray-200 ${rounded} ${className}`}
    />
  );
}