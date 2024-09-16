import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockTodos } from "../../data/mock";

export const fetchTodos = createAsyncThunk("users/fetchTodos", async () => {
  const apiResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const result = await apiResponse.json();
  console.log(result);
  return result;
});

const initialState = {
  mockTodos: mockTodos,
  todos: [],
  loading: false,
  isError: false,
};

const todoReducer = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      (state.loading = false), (state.todos = action.payload);
      console.console.log(action.payload);
      console.console.log(state.todos);
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      (state.loading = false), (state.isError = true);
      console.log(state.todos);
    });
  },
});

export const {} = todoReducer.actions;
export default todoReducer.reducer;
