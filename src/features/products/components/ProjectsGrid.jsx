import React from 'react';

export default function ProjectsGrid({ projects = [] }) {
  return (
    <div className="flex-1 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 
        auto-rows-[160px] sm:auto-rows-[180px] md:auto-rows-[200px] gap-3 sm:gap-4 grid-flow-dense">
        {projects.map((project, index) => {
          const sizeClass = getSizeClass(index);
          
          return (
            <div
              key={project.id || index}
              className={`relative group overflow-hidden shadow-sm bg-gray-100 ${sizeClass}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-white text-xs sm:text-sm font-bold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg">
                  {project.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getSizeClass(index) {
  const sizes = [
    'col-span-2 sm:col-span-3 lg:col-span-3 row-span-1', 
    'col-span-2 sm:col-span-3 lg:col-span-3 row-span-1', 
    'col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2', 
    'col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-4 row-span-1', 
    'col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 row-span-1', 
    'col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-1', 
    'col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 row-span-1', 
  ];
  return sizes[index % sizes.length];
}