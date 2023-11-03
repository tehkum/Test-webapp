import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTestState,
  fetchUserTest,
} from "../../context/features/testSlice";
import "./dashboard.css";
import { useNavigate } from "react-router";
import { scoreCalculator } from "../../utils";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { status, userTests } = useSelector((state) => state.test);
  const navigate = useNavigate();

  useEffect(() => {
    // if (status === "idle") {
    dispatch(fetchUserTest(localStorage.getItem("userId")));
    // }
  }, [status, dispatch]);

  return (
    <div className="dashboard">
      {userTests?.map((item, index) => (
        <div key={index} className="test-collection-box">
          <div>
            <h2>{item?.quiz?.quizName}</h2>
            <p className="test-collection-box-updatetime">
              {scoreCalculator(item)}/{item?.quiz?.questions?.length}
            </p>
            <p className="test-collection-box-questions">
              {item?.quiz?.questions?.length} questions
            </p>
            <p className="test-collection-box-time">
              {item?.quiz?.timer} minutes
            </p>
          </div>
          <div>
            <button
              className="btn-primary"
              onClick={() => {
                dispatch(changeTestState());
                navigate(`/result/${item._id}`);
              }}
            >
              See Full Stats
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
