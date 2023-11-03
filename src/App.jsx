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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/edit/:id" element={<EditQuiz />} />
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
