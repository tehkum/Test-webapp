import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav>
      <h1 onClick={() => navigate("/home")}>Quiz</h1>
      <div>
        <NavLink to="/quiz/add">Add Test</NavLink>
        <LogoutIcon
          sx={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("userId");
            navigate("/login");
          }}
        />
      </div>
    </nav>
  );
}
