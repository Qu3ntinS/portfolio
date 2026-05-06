'use client';

import React from 'react';
import Image from 'next/image';

const Skills = () => {
  const skills = [
    { name: 'React Native', icon: '/portfolio/skills/react.svg' },
    { name: 'React',        icon: '/portfolio/skills/react.svg' },
    { name: 'Symfony',      icon: '/portfolio/skills/symfony.svg' },
    { name: 'PHP',          icon: '/portfolio/skills/php.svg' },
    { name: 'Vue.js',       icon: '/portfolio/skills/vue.svg' },
    { name: 'AWS',          icon: '/portfolio/skills/aws.svg' },
    { name: 'Bootstrap',    icon: '/portfolio/skills/bootstrap.svg' },
    { name: 'CSS',          icon: '/portfolio/skills/css.svg' },
    { name: 'Database',     icon: '/portfolio/skills/database.svg' },
    { name: 'SASS',         icon: '/portfolio/skills/sass.svg' },
    { name: 'Docker',       icon: '/portfolio/skills/docker.svg' },
    { name: 'Figma',        icon: '/portfolio/skills/figma.svg' },
    { name: 'Git',          icon: '/portfolio/skills/git.svg' },
    { name: 'HTML5',        icon: '/portfolio/skills/html.svg' },
    { name: 'Javascript',   icon: '/portfolio/skills/js.svg' },
    { name: 'Linux',        icon: '/portfolio/skills/linux.svg' },
    { name: 'Node.js',      icon: '/portfolio/skills/node.svg' },
  ];

  return (
    <section id="skills" className="py-20 bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10">
            Skills
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="aspect-square flex flex-col items-center justify-center p-4 bg-secondary light:bg-secondary-light rounded-2xl transition-transform duration-200 hover:scale-105"
              >
                <div className="w-14 h-14 flex items-center justify-center mb-2">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    width={44}
                    height={44}
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xs font-medium text-text light:text-text-light text-center leading-tight">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
