import { Link } from "react-router";
import LogoBrand from "@/assets/images/logo-brand.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen mx-auto">
      <Link to="/" className="mb-10">
        <img src={LogoBrand} alt="Logo Brand" />
      </Link>

      {children}

      <div className="mt-10">
        <p className="text-center text-sm text-gray-500">
          © 2023 Screening In. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
