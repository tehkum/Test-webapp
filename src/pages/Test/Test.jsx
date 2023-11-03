import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchQuiz } from "../../context/features/quizSlice";
import "./test.css";
import { addTest } from "../../context/features/testSlice";

export default function Test() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuiz(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [question, setQuestion] = useState(0);
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { quiz, status } = useSelector((state) => state.quiz);
  const [testCompleted, setTestCompleted] = useState(false);
  const [answerSheet, setAnswerSheet] = useState({
    quiz: id,
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

  useEffect(() => {
    if (status === "success") {
      setTime(quiz?.timer);
      setAnswer((prev) => ({
        ...prev,
        statement: quiz?.questions[question]?.statement,
        options: quiz?.questions[question]?.options,
        correctAnswer: quiz?.questions[question]?.correctAnswer,
      }));
    }
  }, [question, quiz, status]);

  const submitHandler = async () => {
    if (question < quiz?.questions?.length - 1) {
      setAnswerSheet({ ...answerSheet, test: [...answerSheet.test, answer] });
      setQuestion(question + 1);
    } else {
      setAnswerSheet({ ...answerSheet, test: [...answerSheet.test, answer] });
      // dispatch(addTest(answerSheet));
      console.log(answerSheet);
      setTestCompleted(true);
      // navigate(`/test/${test._id}`);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (time === 0) {
          clearInterval(countdown);
          dispatch(addTest(answerSheet));
          navigate("/home");
        } else {
          setTime(time - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, seconds]);

  return (
    <div className="container-home">
      <p>
        Time remaining: {time}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      {status === "pending" || status === "idle" ? (
        <p>...loading</p>
      ) : (
        <>
          <p className="small-heading">{quiz?.quizName}</p>
          <h1 className="large-heading">
            Q{question + 1}&#41; {quiz?.questions[question]?.statement}
          </h1>
          <p>Choose the correct answer.</p>
          <div>
            {quiz?.questions[question]?.options?.map((item, index) => (
              <label
                key={index}
                htmlFor={`question-${index}`}
                className="answer-options"
              >
                <input
                  type="radio"
                  id={`question-${index}`}
                  value={answer.givenAnswer}
                  onChange={() => {
                    setAnswer({ ...answer, givenAnswer: index });
                    console.log(answer);
                  }}
                  checked={answer.givenAnswer === index}
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
          // disabled={testCompleted}
        >
          Submit Answer
        </button>
        {testCompleted && (
          <button
            onClick={() => {
              dispatch(addTest(answerSheet));
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
