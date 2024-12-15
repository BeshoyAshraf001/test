import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../Context/userData.Context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
