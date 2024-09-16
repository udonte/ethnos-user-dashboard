import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockUsers } from "../../data/mock";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const apiResponse = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await apiResponse.json();
  console.log(result);
  return result;
});

const initialState = {
  mockUsers: mockUsers,
  users: [],
  loading: false,
  isError: false,
};

const userReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      (state.loading = false), (state.users = action.payload);
      console.console.log(action.payload);
      console.console.log(state.users);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.loading = false), (state.isError = true);
      console.log(state.users);
    });
  },
});

export const {} = userReducer.actions;
export default userReducer.reducer;
