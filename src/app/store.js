import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/users/userSlice";
import postsSlice from "../Features/posts/postsSlice";
import todosSlice from "../Features/todos/todosSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsSlice,
    todos: todosSlice,
  },
});

export default store;
