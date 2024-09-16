import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockAlbums } from "../../data/mock";

export const fetchAlbums = createAsyncThunk("users/fetchAlbums", async () => {
  const apiResponse = await axios.get(
    "https://jsonplaceholder.typicode.com/albums"
  );
  const result = await apiResponse.json();
  console.log(result);
  return result;
});

const initialState = {
  mockAlbums: mockAlbums,
  albums: [],
  loading: false,
  isError: false,
};

const albumReducer = createSlice({
  name: "albums",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      (state.loading = false), (state.albums = action.payload);
      console.console.log(action.payload);
      console.console.log(state.albums);
    });

    builder.addCase(fetchAlbums.rejected, (state, action) => {
      (state.loading = false), (state.isError = true);
      console.log(state.albums);
    });
  },
});

export const {} = albumReducer.actions;
export default albumReducer.reducer;
