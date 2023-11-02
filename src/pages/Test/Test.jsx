import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editQuiz, fetchQuiz } from "../../context/features/quizSlice";
import "./test.css";
import { addTest } from "../../context/features/testSlice";
import { editUser, fetchUser } from "../../context/features/userSlice";

export default function Test() {
  const { id } = useParams();
  const [question, setQuestion] = useState(0);
  const dispatch = useDispatch();
  const { quiz, status } = useSelector((state) => state.quiz);
  const test = useSelector((state) => state.test);
  const user = useSelector((state) => state.user);
  const [testCompleted, setTestCompleted] = useState(false);
  const [answerSheet, setAnswerSheet] = useState({
    quiz: quiz?._id,
    candidate: localStorage.getItem("userId"),
    test: [],
  });
  const [answer, setAnswer] = useState({
    statement: "",
    options: [],
    correctAnswer: "",
    givenAnswer: "",
  });
  const navigate = useNavigate();

  console.log(status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuiz(id));
    }
  }, [id, dispatch, status]);

  useEffect(() => {
    if (status === "success") {
      setAnswer((prev) => ({
        ...prev,
        statement: quiz?.questions[question]?.statement,
        options: quiz?.questions[question]?.options,
        correctAnswer: quiz?.questions[question]?.correctAnswer,
      }));
    }
  }, [question, quiz, status]);

  useEffect(() => {
    if (user.status === "idle") {
      dispatch(fetchUser(localStorage.getItem("userId")));
    }
  }, [dispatch, user]);

  const submitHandler = async () => {
    if (question < quiz?.questions?.length - 1) {
      setAnswerSheet({ ...answerSheet, test: [...answerSheet.test, answer] });
      setQuestion(question + 1);
    } else {
      setAnswerSheet({ ...answerSheet, test: [...answerSheet.test, answer] });
      // dispatch(addTest(answerSheet));
      setTestCompleted(true);
      // navigate(`/test/${test._id}`);
    }
  };

  return (
    <div className="container-home">
      {/* <p>
        Time: {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </p> */}
      {status !== "success" ? (
        <p>...loading</p>
      ) : (
        <>
          <p className="small-heading">{quiz?.quizName}</p>
          <h1 className="large-heading">
            Q{question + 1}&#41; {quiz?.questions[question]?.statement}
          </h1>
          <p>Choose the correct answer.</p>
          <div>
            {quiz?.questions[question]?.options.map((item, index) => (
              <label
                key={index}
                htmlFor={`question-${index}`}
                className="answer-options"
              >
                <input
                  type="radio"
                  id={`question-${index}`}
                  value={answer.givenAnwer}
                  onChange={() => setAnswer({ ...answer, givenAnwer: index })}
                  checked={answer.givenAnwer === index}
                  name={`answer-${question}`}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}
      <div className="btn-group">
        <button
          className="btn-primary"
          onClick={submitHandler}
          disabled={testCompleted}
        >
          Submit Answer
        </button>
        {testCompleted && (
          <button
            onClick={() => {
              dispatch(addTest(answerSheet));
              dispatch(
                editUser({
                  ...user?.user,
                  testGiven: [...user.user.testGiven, test._id],
                })
              );
              dispatch(
                editQuiz({
                  ...quiz,
                  givenBy: [...quiz.givenBy, localStorage.getItem("userId")],
                })
              );
              navigate("/home");
            }}
          >
            Submit test
          </button>
        )}
      </div>
    </div>
  );
}
