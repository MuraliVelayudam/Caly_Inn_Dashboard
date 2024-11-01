import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  all_venues: [],
  isLoading: false,
  error: null,
};

const URL = process.env.NEXT_PUBLIC_URL;

export const fetchVenues_Actions = createAsyncThunk(
  "venues/fetchVenues",
  async (location_Id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const response = await axios.get(
        `${URL}/venue-management/locations/${location_Id}/venues/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues_Actions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVenues_Actions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_venues = action.payload;
      })
      .addCase(fetchVenues_Actions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default venueSlice.reducer;
