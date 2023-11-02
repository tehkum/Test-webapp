import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";
import { testSlice } from "../features/testSlice";
import { quizSlice } from "../features/quizSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    test: testSlice.reducer,
    quiz: quizSlice.reducer,
  },
});
