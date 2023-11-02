import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return localStorage.getItem("userId") ? children : <Navigate to="/login" />;
}
