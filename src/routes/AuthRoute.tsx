import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type AuthRouteProps = {
  element: JSX.Element;
};

const AuthRoute = ({ element: Component }: AuthRouteProps) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? Component : <Navigate to="/" />;
};

export default AuthRoute;
