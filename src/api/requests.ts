import { AuthCredentialsType } from "../hooks/useAuth";
import { Invoices } from "../types/invoiceTypes";
import { apiUrl } from "./apiService";

export const fetchInvoices = async (
  page: number = 1,
  limit: number = 10
): Promise<Invoices> => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Not authorized");
  }

  const response = await fetch(`${apiUrl}/invoices?page${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }
  return response.json();
};

export const loginRequest = async (
  credentials: AuthCredentialsType
): Promise<{ token: string }> => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return response.json();
};
