import { RouteObject } from "react-router-dom";

import InvoicesPage from "../pages/InvoicesPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import MainPage from "../pages/MainPage";
import AuthRoute from "./AuthRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PrivateRoute element={<MainPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/invoices",
    element: <PrivateRoute element={<InvoicesPage />} />,
  },
  {
    path: "/login",
    element: <AuthRoute element={<LoginPage />} />,
  },
];
