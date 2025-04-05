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
    <footer className="relative w-full bg-background light:bg-background-light">
      {/* Wave Background */}
      <div className="absolute top-0 left-0 right-0 w-full">
        <Image
          src="/portfolio/footer-wave.svg"
          alt="Footer Wave"
          width={1440}
          height={250}
          className="w-full"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4 pt-[120px] pb-4">
          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`w-[60px] h-[30px] rounded-full flex items-center p-[4px] transition-all duration-300 focus:outline-none ${
                isDarkMode ? 'bg-[#F0F0F0]' : 'bg-[#0F0F0F]'
              }`}
              aria-label="Toggle theme"
            >
              <div className="relative w-full h-full">
                {/* Moon Icon */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-[4px]">
                  <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_32)">
                      <path d="M6.20831 5.51074C6.20831 4.19504 6.4021 2.86344 6.89581 1.72949C3.61171 3.15906 1.39581 6.51277 1.39581 10.3232C1.39581 15.449 5.55132 19.6045 10.6771 19.6045C14.4875 19.6045 17.8412 17.3886 19.2708 14.1045C18.1369 14.5982 16.8053 14.792 15.4896 14.792C10.3638 14.792 6.20831 10.6365 6.20831 5.51074Z" stroke="#F7FAFD" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_22_32">
                        <rect width="20" height="20" fill="white" transform="translate(0.333313 0.666992)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                {/* Sun Icon */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-[4px]">
                  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94" 
                      stroke={isDarkMode ? "#000000" : "#F7FAFD" } 
                      strokeLinecap="round" 
                      strokeMiterlimit="10" 
                      strokeWidth="32"
                    />
                    <circle 
                      cx="256" 
                      cy="256" 
                      r="80" 
                      stroke={isDarkMode ? "#000000" : "#F7FAFD"} 
                      strokeLinecap="round" 
                      strokeMiterlimit="10" 
                      strokeWidth="32"
                    />
                  </svg>
                </div>
                {/* Toggle Circle */}
                <div 
                  className={`w-[22px] h-[22px] rounded-full absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isDarkMode 
                      ? 'left-0 bg-[#7091A4]' 
                      : 'left-[calc(100%-22px)] bg-[#5B7CBF]'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={24}
                  height={24}
                  className="w-8 h-8 brightness-0 invert"
                />
              </Link>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-white">
            <Link href="/impressum" className="text-sm hover:opacity-80 transition-opacity">Impressum</Link>
            <Link href="/datenschutz" className="text-sm hover:opacity-80 transition-opacity">Datenschutz</Link>
          </div>

          {/* Copyright */}
          <div className="text-white text-sm">
            © Copyright {new Date().getFullYear()} | Made with <span className="text-red-500">❤</span> by Quentin
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 