import React from 'react';

export default function ProjectsGrid({ projects = [] }) {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {projects.map((project, index) => (
        <div
          key={project.id || index}
          className="relative group overflow-hidden rounded-2xl shadow-sm aspect-square bg-gray-100"
        >
          <img
            src={project.image}
            alt={project.title || `مشروع ${index + 1}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {/* تأثير تفاعلي عند الهوفر */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg">
              {project.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}