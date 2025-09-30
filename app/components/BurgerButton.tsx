"use client";

import React from "react";

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none rounded z-50 relative"
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <span
        className={`block w-6 h-0.5 bg-text light:bg-text-light transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-text light:bg-text-light transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-text light:bg-text-light transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
};

export default BurgerButton;
