import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

export const fetchQuizes = createAsyncThunk("quiz/fetchQuizes", async () => {
  const res = await axios.get(`${API_URL}/quiz/`);
  return res.data;
});

export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async (id) => {
  const res = await axios.get(`${API_URL}/quiz/${id}`);
  return res.data;
});

export const addQuiz = createAsyncThunk("quiz/addQuiz", async (data) => {
  const res = await axios.post(`${API_URL}/quiz/`, data);
  return res.data;
});

export const editQuiz = createAsyncThunk("quiz/editQuiz", async (data) => {
  const res = await axios.put(`${API_URL}/quiz/${data._id}`, data);
  return res.data;
});

export const removeQuiz = createAsyncThunk("quiz/removeQuiz", async (id) => {
  const res = await axios.delete(`${API_URL}/quiz/${id}`);
  return { data: res.data, id: id };
});

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizes: [],
    quiz: {},
    status: "idle",
    error: null,
  },
  reducers: {
    changeState: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: {
    [fetchQuizes.pending]: (state) => {
      state.status = "pending";
    },
    [fetchQuizes.fulfilled]: (state, action) => {
      state.status = "success";
      state.quizes = action.payload.quiz;
    },
    [fetchQuizes.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addQuiz.pending]: (state) => {
      state.status = "pending";
    },
    [addQuiz.fulfilled]: (state, action) => {
      state.status = "success";
      state.quizes = [...state.quizes, action.payload.quiz];
    },
    [addQuiz.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchQuiz.pending]: (state) => {
      state.status = "pending";
    },
    [fetchQuiz.fulfilled]: (state, action) => {
      state.status = "success";
      state.quiz = action.payload.quiz;
    },
    [fetchQuiz.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editQuiz.pending]: (state) => {
      state.status = "pending";
    },
    [editQuiz.fulfilled]: (state, action) => {
      state.status = "success";
      state.quizes = state.quizes.map((item) =>
        item._id === action.payload.quiz._id ? action.payload.quiz : item
      );
    },
    [editQuiz.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [removeQuiz.pending]: (state) => {
      state.status = "pending";
    },
    [removeQuiz.fulfilled]: (state, action) => {
      state.status = "success";
      state.quizes = state.quiz.filter(
        (item) => item._id !== action.payload.id
      );
    },
    [removeQuiz.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { changeState } = quizSlice.actions;
