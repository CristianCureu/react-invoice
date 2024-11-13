import { useMemo, useState } from "react";
import { router } from "../routes/router";
import { loginRequest } from "../api/requests";

export type AuthContextType = {
  login: (credentials: AuthCredentialsType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  authToken: string | null;
};

export type AuthCredentialsType = {
  email: string;
  password: string;
};

const useAuth = (): AuthContextType => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  const login = async (credentials: AuthCredentialsType) => {
    try {
      const { token } = await loginRequest(credentials);
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      router.navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };

  const logout = () => {
    setAuthToken(null);
  };

  const isAuthenticated = useMemo(() => {
    return authToken !== null;
  }, [authToken]);

  return { login, logout, isAuthenticated, authToken };
};

export default useAuth;
