import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils";

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
  const res = await axios.get(`${API_URL}/user/${id}`);
  return res.data;
});

export const editUser = createAsyncThunk("user/editUser", async (data) => {
  const res = await axios.put(`${API_URL}/user/${data._id}`, data);
  return res.data;
});

export const addUser = createAsyncThunk("user/addUser", async (data) => {
  const res = await axios.post(`${API_URL}/user/`, data);
  return res.data;
});

export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email) => {
    const res = await axios.post(`${API_URL}/user/email`, { email });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("userId", action.payload.user._id);
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addUser.pending]: (state) => {
      state.status = "pending";
    },
    [addUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("userId", action.payload.user._id);
    },
    [addUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editUser.pending]: (state) => {
      state.status = "pending";
    },
    [editUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("userId", action.payload.user._id);
    },
    [editUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchUserByEmail.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUserByEmail.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      localStorage.setItem("userId", action.payload.user._id);
    },
    [fetchUserByEmail.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});
