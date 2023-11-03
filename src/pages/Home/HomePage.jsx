import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./home.css";
import Dashboard from "../dashboard/Dashboard";
import TestCollection from "../TestCollection/TestCollection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../context/features/userSlice";
// import { useNavigate } from "react-router";

const HomePage = () => {
  const { status, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  // const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        console.log("uid", user);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser(localStorage.getItem("userId")));
    }
  }, [dispatch, status]);

  return (
    <div className="container-home">
      <p className="small-heading">Home Section</p>
      <h1 className="large-heading">Welcome {user?.displayName}!</h1>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(e, newVal) => setValue(newVal)}
            aria-label="lab API tabs example"
          >
            <Tab label="Dashboard" value="1" sx={{ width: "50%" }} />
            <Tab label="Test" value="2" sx={{ width: "50%" }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Dashboard />
        </TabPanel>
        <TabPanel value="2">
          <TestCollection />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default HomePage;
