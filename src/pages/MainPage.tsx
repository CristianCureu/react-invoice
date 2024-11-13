import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import useAuth from "../hooks/useAuth";

const MainPage = () => {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <button
        style={{
          position: "absolute",
          top: 20,
          right: 50,
          padding: 10,
          cursor: "pointer",
        }}
        onClick={logout}
      >
        Logout
      </button>
      <h2>Home</h2>
      <Link to="/invoices">Go To Invoices</Link>
    </MainLayout>
  );
};

export default MainPage;
