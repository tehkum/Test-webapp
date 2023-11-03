import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeState,
  fetchQuizes,
  removeQuiz,
} from "../../context/features/quizSlice";
import "./test.css";
import { convertISOToReadableFormat } from "../../utils";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router";
import copy from "copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUser } from "../../context/features/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const iconStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.244)",
  borderRadius: "50%",
  padding: "2px",
  marginLeft: "5px",
  cursor: "pointer",
};

export default function TestCollection() {
  const dispatch = useDispatch();
  const { status, quizes } = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (user.status === "idle") {
      dispatch(fetchUser(localStorage.getItem("userId")));
    }
  }, [dispatch, user.status]);

  return (
    <div className="test-collection">
      {status === "pending" ? (
        <div className="loader-center">
          <CircularProgress />
        </div>
      ) : (
        quizes?.map((quiz, index) => (
          <div key={index} className="test-collection-box">
            {user?.user.isAdmin && (
              <span className="sec-admin-edit">
                <EditIcon
                  style={{ ...iconStyle }}
                  onClick={() => navigate(`/edit/${quiz?._id}`)}
                />
                <DeleteIcon
                  style={{ ...iconStyle }}
                  onClick={() => dispatch(removeQuiz(quiz?._id))}
                />
              </span>
            )}
            <div>
              <h2>{quiz?.quizName}</h2>
              <p className="test-collection-box-updatetime">
                {convertISOToReadableFormat(quiz?.updatedAt)}
              </p>
              <p className="test-collection-box-questions">
                {quiz?.questions?.length} questions
              </p>
              <p className="test-collection-box-time">{quiz?.timer} minutes</p>
              <p
                className="copy-link"
                onClick={() => copy(`localhost:5173/${quiz?._id}`)}
              >
                Share test link <ContentCopyIcon sx={{ cursor: "pointer" }} />
              </p>
            </div>
            {quiz?.givenBy?.find(
              (item) => item === localStorage.getItem("userId")
            ) ? (
              <p>Test already given</p>
            ) : (
              <button
                className="btn-primary"
                onClick={() => {
                  setValue(quiz);
                  handleOpen();
                }}
              >
                Start test
              </button>
            )}
          </div>
        ))
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="small-heading">Start the test</p>
          <h1 className="large-heading">{value?.quizName}</h1>
          <p>{value?.timer} minutes</p>
          <p>{value?.questions?.length} questions</p>
          <button
            className="btn-primary"
            onClick={() => {
              navigate(`/test/${value?._id}`);
              dispatch(changeState());
            }}
          >
            Confirm
          </button>
          <button className="btn-close" onClick={handleClose}>
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
}
