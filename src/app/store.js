import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/users/userSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
