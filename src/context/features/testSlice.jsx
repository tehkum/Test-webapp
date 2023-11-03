import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

export const fetchUserTest = createAsyncThunk(
  "test/fetchUserTest",
  async (id) => {
    const res = await axios.get(`${API_URL}/test/user/${id}`);
    return res.data;
  }
);

export const fetchTest = createAsyncThunk("test/fetchTest", async (id) => {
  const res = await axios.get(`${API_URL}/test/${id}`);
  return res.data;
});

export const fetchTests = createAsyncThunk("test/fetchTests", async () => {
  const res = await axios.get(`${API_URL}/test/`);
  return res.data;
});

export const addTest = createAsyncThunk("test/addTest", async (data) => {
  const res = await axios.post(`${API_URL}/test/`, data);
  return res.data;
});

export const testSlice = createSlice({
  name: "test",
  initialState: {
    userTests: [],
    tests: [],
    test: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserTest.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUserTest.fulfilled]: (state, action) => {
      state.status = "success";
      state.userTests = action.payload.test;
    },
    [fetchUserTest.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addTest.pending]: (state) => {
      state.status = "pending";
    },
    [addTest.fulfilled]: (state, action) => {
      state.status = "success";
      state.tests = [...state.tests, action.payload.test];
      state.userTest = [...state.userTest, action.payload.test];
      state.test = action.payload.test;
    },
    [addTest.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchTests.pending]: (state) => {
      state.status = "pending";
    },
    [fetchTests.fulfilled]: (state, action) => {
      state.status = "success";
      state.tests = action.payload.test;
    },
    [fetchTests.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchTest.pending]: (state) => {
      state.status = "pending";
    },
    [fetchTest.fulfilled]: (state, action) => {
      state.status = "success";
      state.test = action.payload.test;
    },
    [fetchTest.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});
