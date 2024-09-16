import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/users/userSlice";
import postsSlice from "../Features/posts/postsSlice";
import todosSlice from "../Features/todos/todosSlice";
import albumsSlice from "../Features/albums/albums.slice";

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsSlice,
    todos: todosSlice,
    albums: albumsSlice,
  },
});

export default store;
