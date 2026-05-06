'use client';

import React from 'react';

interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
}

const HCLogo = () => (
  <div className="flex-shrink-0 w-[70px] h-[70px] rounded-xl bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden border border-[#2a2a2a]">
    <span className="text-white font-bold text-2xl tracking-tight select-none">HC</span>
    <span className="absolute bottom-[6px] right-[8px] text-[10px]">🌿</span>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="flex-1 min-w-0 bg-secondary light:bg-secondary-light rounded-xl p-5 flex flex-col gap-4 hover:scale-[1.01] transition-transform duration-200">
    <div className="flex items-start gap-4">
      <HCLogo />
      <div className="flex-1 min-w-0">
        <h3 className="text-text light:text-text-light font-bold text-base mb-1">{project.title}</h3>
        <p className="text-text light:text-text-light opacity-60 text-sm leading-relaxed line-clamp-4">
          {project.description}
        </p>
      </div>
    </div>
    <div className="flex gap-3 mt-auto">
      <a href={project.github} className="flex-1 text-center py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
        Github
      </a>
      <a href={project.demo} className="flex-1 text-center py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
        Demo
      </a>
    </div>
  </div>
);

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'HobbyConnect',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
      github: '#',
      demo: '#',
    },
    {
      title: 'HobbyConnect',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10">Projects</h2>
          <div className="flex flex-col md:flex-row gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
