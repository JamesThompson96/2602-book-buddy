import { createContext, useContext, useState } from "react";
import Register from "./register";
const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const register = async (credentials) => {
    try {
      const response = await fetch(API + "/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw Error(
          result.message || "Registration failed. Account may already exist.",
        );
      }

      setToken(result.token);
      localStorage.setItem("token", result.token);
    } catch (error) {
      throw Error(error.message);
    }
  };
  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw Error(result.message || "Invalid email or password.");
    }

    setToken(result.token);
  };

  const logout = () => setToken(null);

  const value = { token, logout, login, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
