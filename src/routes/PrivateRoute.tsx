import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element: Component }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
