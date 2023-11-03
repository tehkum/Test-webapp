import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTest } from "../../context/features/testSlice";
import "./dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { status, userTests } = useSelector((state) => state.test);

  useEffect(() => {
    // if (status === "idle") {
    dispatch(fetchUserTest(localStorage.getItem("userId")));
    // }
  }, [status, dispatch]);

  const scoreCalculator = (items) => {
    return items?.test?.reduce(
      (acc, item) =>
        +item?.correctAnswer === +item?.givenAnswer ? acc + 1 : acc,
      0
    );
  };

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
        </div>
      ))}
    </div>
  );
}
