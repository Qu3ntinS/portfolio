"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import BurgerButton from "./BurgerButton";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "About me", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="top-0 left-0 right-0 z-50 py-4 bg-primary pt-[35px] relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-around relative z-[100]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/portfolio/logo.svg"
              alt="Logo"
              width={60}
              height={60}
              className="w-[4rem] h-[4rem]"
            />
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-text light:text-text hover:opacity-80 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Discord Button */}
          <Link
            href="#discord"
            className="hidden md:block bg-secondary text-text light:text-text-light light:bg-secondary-light px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Discord
          </Link>

          {/* Mobile Burger Button */}
          <BurgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navItems={navItems}
      />
    </nav>
  );
};

export default Navbar;
