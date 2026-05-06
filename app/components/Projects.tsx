'use client';

import React from 'react';
import Image from 'next/image';

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with Next.js and Tailwind CSS',
      image: '/portfolio/projects/portfolio.jpg',
      tech: ['Next.js', 'React', 'Tailwind CSS'],
      link: '#'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration',
      image: '/portfolio/projects/ecommerce.jpg',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'A productivity tool for managing tasks and projects',
      image: '/portfolio/projects/task-manager.jpg',
      tech: ['Vue.js', 'Firebase', 'Vuetify'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 text-white relative bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10 flex items-center">
            Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-secondary light:bg-secondary-light rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="h-48 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-text light:text-text-light text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-text light:text-text-light text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-full bg-primary text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link}
                    className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 