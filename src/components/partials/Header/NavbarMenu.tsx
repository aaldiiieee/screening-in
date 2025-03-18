import React, { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface NavbarMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({
  isMenuOpen,
  toggleMenu,
  menuRef,
}) => {
  const menuItems = [
    { name: "About us", url: "#" },
    { name: "Services", url: "#" },
    { name: "Reviews", url: "#" },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex text-lg flex-row p-0 items-center space-x-10 rtl:space-x-reverse mt-0 border-0 bg-white dark:bg-gray-900">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className="text-gray-900 p-0">
                {item.name}
              </Link>
            </li>
          ))}
          <Button variant="outline" size="lg">
            Analyze a resume
          </Button>
        </ul>
      </div>

      {/* Mobile Menu */}
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
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                to={item.url}
                className="block py-2 px-3 md:text-black text-white rounded-sm"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavbarMenu;
