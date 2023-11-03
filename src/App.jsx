import { Route, Routes } from "react-router";
import "./App.css";
import Signup from "./pages/Authentication/Signup/signup";
import Login from "./pages/Authentication/Login/login";
import HomePage from "./pages/Home/HomePage";
import AddQuiz from "./pages/private/AddQuiz/AddQuiz";
import Layout from "./components/layout/Layout";
import Test from "./pages/Test/Test";
import EditQuiz from "./pages/private/EditQuiz/EditQuiz";
import Header from "./components/header/Header";
import Result from "./pages/Result/result";
import IsLoggedIn from "./components/layout/isLoggedIn";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <IsLoggedIn>
              <Signup />
            </IsLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <IsLoggedIn>
              <Login />
            </IsLoggedIn>
          }
        />
        <Route
          path="/test/:id"
          element={
            <Layout>
              <Test />
            </Layout>
          }
        />
        <Route
          path="/result/:id"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Layout>
              <EditQuiz />
            </Layout>
          }
        />
        <Route
          path="/quiz/add"
          element={
            <Layout>
              <AddQuiz />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
