import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockPosts } from "../../data/mock";

export const fetchPosts = createAsyncThunk("users/fetchPosts", async () => {
  const apiResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const result = await apiResponse.json();
  console.log(result);
  return result;
});

const initialState = {
  mockPosts: mockPosts,
  posts: [],
  loading: false,
  isError: false,
};

const postReducer = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      (state.loading = false), (state.posts = action.payload);
      console.console.log(action.payload);
      console.console.log(state.posts);
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      (state.loading = false), (state.isError = true);
      console.log(state.posts);
    });
  },
});

export const {} = postReducer.actions;
export default postReducer.reducer;
