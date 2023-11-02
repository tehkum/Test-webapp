import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editQuiz } from "../../../context/features/quizSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditQuiz() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.quiz);
  const { id } = useParams();

  const initialQuestions = {
    statement: "",
    options: [],
    correctAnswer: "",
  };

  const [form, setForm] = useState({});
  const [question, setQuestion] = useState(initialQuestions);
  const [option, setOption] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    axios
      .get(`https://quizwebapp-dhe6.onrender.com/quiz/${id}`)
      .then((res) => setForm(res.data.quiz))
      .catch((err) => console.error(err));
  }, [id]);

  const optionAdder = () => {
    setQuestion((prev) => ({ ...prev, options: [...prev.options, option] }));
    setOption("");
  };

  const questionAdder = () => {
    setForm((prev) => ({ ...prev, questions: [...prev.questions, question] }));
    setQuestion(initialQuestions);
  };

  const quizAdder = () => {
    dispatch(editQuiz(form));
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="container-add-quiz">
      <p className="small-heading">QUIZ SECTION</p>
      <h1 className="large-heading">Edit quiz</h1>
      <label>
        Quiz Name
        <input
          type="text"
          name="quizName"
          placeholder="Enter quiz name"
          value={form.quizName}
          onChange={handleChange}
        />
      </label>
      <label>
        Time(in minutes)
        <input
          type="number"
          placeholder="Enter time"
          value={form.timer}
          name="timer"
          onChange={handleChange}
        />
      </label>
      <div>
        <label>
          Question
          <textarea
            value={question.statement}
            name="statement"
            placeholder="Enter question"
            onChange={(e) =>
              setQuestion((prev) => ({ ...prev, statement: e.target.value }))
            }
          />
        </label>
        <label>
          Options
          <input
            name="options"
            placeholder="Enter option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
          <button onClick={optionAdder} className="btn-option">
            Add Option
          </button>
        </label>
        {question.options.length > 0 &&
          question?.options?.map((item, index) => (
            <li key={index} value={index}>
              {item}
            </li>
          ))}
        <label>
          Correct Answer
          <select
            onChange={(e) =>
              setQuestion({ ...question, correctAnswer: e.target.value })
            }
            value={question.correctAnswer}
          >
            <option>Select Answer</option>
            {question?.options?.map((item, index) => (
              <option key={index} value={index}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={questionAdder} className="btn-option">
            Add Question
          </button>
        </label>
        {form?.questions?.map((item, index) => (
          <div key={index}>
            <h2>
              Q{index + 1}&#41; {item?.statement}
            </h2>
            <ol>
              {item?.options?.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ol>
            <p>
              <strong>Correct Answer:</strong>{" "}
              {item?.options[+item?.correctAnswer]}
            </p>
            <button
              onClick={() =>
                setForm({
                  ...form,
                  questions: form?.questions?.filter((_, ind) => index !== ind),
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {status === "pending" ? (
        <p>...loading</p>
      ) : (
        <button onClick={quizAdder} className="btn-add">
          Edit Quiz
        </button>
      )}
    </div>
  );
}
