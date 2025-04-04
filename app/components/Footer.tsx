'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const socialLinks = [
    {
      name: 'Stack Overflow',
      icon: '/portfolio/social/stackoverflow-logo.svg',
      href: '#'
    },
    {
      name: 'Instagram',
      icon: '/portfolio/social/instagram-logo.svg',
      href: '#'
    },
    {
      name: 'GitHub',
      icon: '/portfolio/social/github-logo.svg',
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: '/portfolio/social/linkedin-logo.svg',
      href: '#'
    }
  ];

  return (
    <footer className="relative py-8 bg-primary ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-text">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                  <path d="M12 3C12.5523 3 13 3.44772 13 4V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V4C11 3.44772 11.4477 3 12 3Z" fill="currentColor"/>
                  <path d="M12 18C12.5523 18 13 18.4477 13 19V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V19C11 18.4477 11.4477 18 12 18Z" fill="currentColor"/>
                  <path d="M21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H21Z" fill="currentColor"/>
                  <path d="M6 12C6 11.4477 5.55228 11 5 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H5C5.55228 13 6 12.5523 6 12Z" fill="currentColor"/>
                </svg>
              </span>
              <button
                onClick={toggleTheme}
                className="w-12 h-6 rounded-full bg-secondary-light dark:bg-secondary flex items-center transition-all duration-300 focus:outline-none"
                aria-label="Toggle theme"
              >
                <div 
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'ml-1 bg-accent' 
                      : 'ml-6 bg-accent-light'
                  }`}
                />
              </button>
              <span className="text-text">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.3275 10.2922 19.4872 10.3367C18.6469 10.3813 17.8414 10.1331 17.2162 9.63615C16.5911 9.13917 16.1896 8.42159 16.0838 7.63131C15.9781 6.84104 16.1676 6.0392 16.6195 5.35767C17.0715 4.67614 17.7505 4.15775 18.5410 3.89571C16.7416 2.66843 14.5992 1.99014 12.2256 2.00253Z" fill="currentColor"/>
                </svg>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-text light:text-text-light hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </Link>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 text-text">
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
            </div>

            {/* Copyright */}
            <div className="text-text text-sm">
              © Copyright {new Date().getFullYear()} | Made with <span className="text-red-500">❤</span> by Quentin
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 