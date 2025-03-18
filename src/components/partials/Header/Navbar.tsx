import React, { useState, useEffect, useRef } from "react";
import LogoBrand from "@/assets/images/logo-brand.png";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={LogoBrand}
            className="h-10"
            alt="Flowbite Logo"
          />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex text-xl flex-row p-0 space-x-8 rtl:space-x-reverse mt-0 border-0 bg-white dark:bg-gray-900">
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 p-0">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 p-0">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 p-0">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        <div
          ref={menuRef}
          className={`fixed inset-0 bg-black bg-opacity-50 md:hidden top-0 right-0 z-40 h-screen w-full text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="p-4 flex justify-end items-center">
            <button onClick={toggleMenu} className="p-2 text-white rounded-lg">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="font-medium p-4 text-end uppercase text-2xl">
            <li className="mb-4">
              <a
                href="#"
                className="block py-2 px-3 md:text-black text-white rounded-sm"
              >
                About us
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="block py-2 px-3 md:text-black text-white rounded-sm"
              >
                Services
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="block py-2 px-3 md:text-black text-white rounded-sm"
              >
                Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
