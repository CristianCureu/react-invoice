import { useState } from "react";
import { z } from "zod";

import Input from "../components/Input";
import useAuth from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginFormData>>({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({ email: "", password: "" });
    setServerError(null);

    try {
      loginSchema.parse(formData);
      await login(formData);
      setFormData({ email: "", password: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setFormErrors(errors);
      } else if (error instanceof Error) {
        setServerError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {serverError && (
        <div style={{ color: "red", marginBottom: "10px" }}>{serverError}</div>
      )}
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>
        <Input
          id="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          type="email"
        />

        <Input
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          type="password"
        />
        <div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
