import React, { createContext, useState } from "react";

export const userContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (token) {
    localStorage.setItem("token", token);
  }
  function Logout() {
    localStorage.removeItem("token");
    setToken(null);
  }
  // * send token and set token and logout into context (in every components)
  return (
    <userContext.Provider value={{ token, setToken, Logout }}>
      {children}
    </userContext.Provider>
  );
}
