import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import "../auth.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../context/features/userSlice";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const [role, setRole] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password, displayName)
      .then(async (userCredential) => {
        console.log(role === "teacher");
        if (role === "teacher") {
          dispatch(
            addUser({ email: email, displayName: displayName, isAdmin: true })
          );
        } else {
          dispatch(addUser({ email: email, displayName: displayName }));
        }
        const user = userCredential.user;
        console.log(user);
        updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main>
      <section className="auth-form">
        <div>
          <div>
            <p className="small-heading"> QUIZ APP </p>
            <h1 className="large-heading"> Signup </h1>

            <form className="authentication-form">
              <div>
                <label htmlFor="password">Username</label>
                <input
                  type="text"
                  label="Enter Username"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  placeholder="Username"
                />
              </div>

              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(() => e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="email-address">Role</label>
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                    console.log(role);
                  }}
                  value={role}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              {status === "pending" ? (
                <p>...loaging</p>
              ) : (
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="btn-primary"
                  style={{ marginTop: "20px" }}
                >
                  Sign up
                </button>
              )}
            </form>

            <p>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
