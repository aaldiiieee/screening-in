import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const NavbarDropdown = ({ signOut }: { signOut: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown relative" ref={dropdownRef}>
      <button
        className="btn btn-secondary cursor-pointer"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <img
            src="https://via.placeholder.com/30"
            alt="User Avatar"
            className="rounded-full mr-2"
          />
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l5 5 5-5H7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="z-10 right-0 mt-2 absolute bg-white shadow p-4 rounded-lg w-44"
          aria-labelledby="navbarDropdown"
        >
          <ul className="flex flex-col gap-2">
            <li >
              <Link to="#">Dashboard</Link>
            </li>
            <li>
              <Link to="#">Analyze</Link>
            </li>
            <li className="text-red-500">
              <button onClick={signOut} type="button">Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
