'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { isDarkMode } = useTheme();
  
  const skills = [
    { 
      name: 'React', 
      iconLight: '/portfolio/skills/light/react.svg',
      iconDark: '/portfolio/skills/react.svg' 
    },
    { 
      name: 'Next.js', 
      iconLight: '/portfolio/skills/light/nextjs.svg',
      iconDark: '/portfolio/skills/nextjs.svg' 
    },
    { 
      name: 'JavaScript', 
      iconLight: '/portfolio/skills/light/javascript.svg',
      iconDark: '/portfolio/skills/javascript.svg' 
    },
    { 
      name: 'PHP', 
      iconLight: '/portfolio/skills/light/php.svg',
      iconDark: '/portfolio/skills/php.svg' 
    },
    { 
      name: 'Vue', 
      iconLight: '/portfolio/skills/light/vue.svg',
      iconDark: '/portfolio/skills/vue.svg' 
    },
    { 
      name: 'AWS', 
      iconLight: '/portfolio/skills/light/aws.svg',
      iconDark: '/portfolio/skills/aws.svg' 
    },
    { 
      name: 'Bootstrap', 
      iconLight: '/portfolio/skills/light/bootstrap.svg',
      iconDark: '/portfolio/skills/bootstrap.svg' 
    },
    { 
      name: 'HTML', 
      iconLight: '/portfolio/skills/light/html.svg',
      iconDark: '/portfolio/skills/html.svg' 
    },
    { 
      name: 'MySQL', 
      iconLight: '/portfolio/skills/light/mysql.svg',
      iconDark: '/portfolio/skills/mysql.svg' 
    },
    { 
      name: 'jQuery', 
      iconLight: '/portfolio/skills/light/jquery.svg',
      iconDark: '/portfolio/skills/jquery.svg' 
    },
    { 
      name: 'Docker', 
      iconLight: '/portfolio/skills/light/docker.svg',
      iconDark: '/portfolio/skills/docker.svg' 
    },
    { 
      name: 'Git', 
      iconLight: '/portfolio/skills/light/git.svg',
      iconDark: '/portfolio/skills/git.svg' 
    },
    { 
      name: 'Azure', 
      iconLight: '/portfolio/skills/light/azure.svg',
      iconDark: '/portfolio/skills/azure.svg' 
    },
    { 
      name: 'CSS', 
      iconLight: '/portfolio/skills/light/css.svg',
      iconDark: '/portfolio/skills/css.svg' 
    },
    { 
      name: 'Node.js', 
      iconLight: '/portfolio/skills/light/nodejs.svg',
      iconDark: '/portfolio/skills/nodejs.svg' 
    },
  ];

  return (
    <section id="skills" className="py-20 text-white relative bg-background light:bg-background-light">
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-10">
            Skills
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-[25px]">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="aspect-square flex flex-col items-center justify-center p-4 bg-secondary light:bg-secondary-light rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <Image
                    src={isDarkMode ? skill.iconLight : skill.iconDark}
                    alt={`${skill.name} Icon`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 