import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  leads: [],
  loading: false,
  error: null,
};

const url = process.env.NEXT_PUBLIC_URL;

export const fetchLeads_Action = createAsyncThunk(
  "leads/fetchLeads",
  async (locationId) => {
    const token = localStorage.getItem("access-token");

    const response = await axios.get(
      `${url}/leads-management/leads/get/${locationId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data?.results;
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads_Action.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads_Action.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads_Action.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leadsSlice.reducer;
