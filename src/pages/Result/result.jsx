import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchTest } from "../../context/features/testSlice";
import { scoreCalculator } from "../../utils";
import "./results.css";

export default function Result() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, test } = useSelector((state) => state.test);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTest(id));
    }
  }, [dispatch, status, id]);

  console.log(test);

  return (
    <div className="container-home">
      <p className="small-heading">RESULT SECTION</p>
      <h1 className="large-heading">Your results are</h1>
      <p>YOUR SCORE: {scoreCalculator(test)}</p>
      <div>
        {test?.test?.map((item, index) => (
          <div key={index}>
            <h1>
              Q{index + 1}&#41; {item?.statement}
            </h1>
            <ul>
              {item?.options?.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ul>
            <p>
              Correct Answer: <span>{item?.correctAnswer}</span>
            </p>
            <p>
              Given Answer: <span>{item?.givenAnswer}</span>
            </p>
          </div>
        ))}
      </div>
      {/* <h1>Tests given by</h1>
      <table>
        <tr>
          <td>Name</td>
        </tr>
        {test?.candidate?.map((item, index) => (
          <tr key={index}>
            <td>{item.displayName}</td>
          </tr>
        ))}
      </table> */}
    </div>
  );
}
