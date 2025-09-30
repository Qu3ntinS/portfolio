"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
}) => {
  const { isDarkMode } = useTheme();
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Track if menu has been opened to prevent initial animation
  useEffect(() => {
    if (isOpen) {
      setHasBeenOpened(true);
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render anything if menu has never been opened
  if (!hasBeenOpened && !isOpen) {
    return null;
  }

  return (
    <div
      className={`md:hidden fixed inset-0 z-40 ${
        isOpen ? "animate-expandFromNavbar" : "animate-collapseToNavbar"
      }`}
      style={{
        transformOrigin: "top center",
      }}
    >
      {/* Full Screen Overlay */}
      <div className="absolute inset-0 bg-primary light:bg-primary-light">
        {/* Content Container */}
        <div className="flex flex-col h-full pt-24 pb-8 px-6">
          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col justify-center space-y-8">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`text-2xl font-medium text-text light:text-text-light hover:text-secondary light:hover:text-secondary-light transition-all duration-300 transform hover:translate-x-2 ${
                  isOpen ? "animate-fadeInUp" : ""
                }`}
                style={{
                  animationDelay: isOpen ? `${index * 100}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Discord Button */}
          <div className="mt-8">
            <Link
              href="#discord"
              onClick={onClose}
              className="block w-full text-center bg-secondary light:bg-secondary-light text-text light:text-text-light px-8 py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium text-lg"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
