import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function IsLoggedIn({ children }) {
  return localStorage.getItem("userId") ? <Navigate to="/home" /> : children;
}
