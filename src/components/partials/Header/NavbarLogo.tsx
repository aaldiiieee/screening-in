import LogoBrand from "@/assets/images/logo-brand.png";

const NavbarLogo = () => {
  return (
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={LogoBrand} className="h-12" alt="Logo" />
    </a>
  );
};

export default NavbarLogo;
