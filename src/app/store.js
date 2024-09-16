import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/users/userSlice";
import postsSlice from "../Features/posts/postsSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsSlice,
  },
});

export default store;
