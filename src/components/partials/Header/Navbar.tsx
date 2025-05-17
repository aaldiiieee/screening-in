import { useState, useEffect, useRef } from "react";
import { useSession } from "@/context/AuthContext";
import NavbarLogo from "./NavbarLogo";
import NavbarMenuToggle from "./NavbarMenuToggle";
import NavbarMenu from "./NavbarMenu";
import NavbarDropdown from "./NavbarDropdown";
import { IAuthContext } from "@/types/context";
import callApiUrl from "@/lib/axiosInstance";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, signOut } = useSession() as IAuthContext;
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApiUrl.get("/api/v1/me");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sessionStorage.getItem("USER_TOKEN")) {
      fetchData();
    }
  }, []);

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
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavbarLogo />
          <NavbarMenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <NavbarMenu
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            menuRef={menuRef}
          >
            {token && (
              <NavbarDropdown signOut={signOut} />
            )}
          </NavbarMenu>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
