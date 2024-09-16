import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockAlbums } from "../../data/mock";

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  const apiResponse = await fetch(
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
    });

    builder.addCase(fetchAlbums.rejected, (state, action) => {
      (state.loading = false), (state.isError = true);
    });
  },
});

export const {} = albumReducer.actions;
export default albumReducer.reducer;
