import { Navigate, Outlet, useLocation } from "react-router";
import { ProtectedRouteProps } from "@/types/modules";

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/authenticate" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
