import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../context/features/userSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser(localStorage.getItem("userId")));
    }
  }, [status, dispatch]);

  return (
    <nav>
      <h1 onClick={() => navigate("/home")}>Quiz</h1>
      {localStorage.getItem("userId") ? (
        <div>
          {user?.isAdmin && (
            <NavLink to="/quiz/add" className="nav-link">
              Add Test
            </NavLink>
          )}
          <LogoutIcon
            sx={{ fontSize: "18px", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("userId");
              navigate("/login");
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
