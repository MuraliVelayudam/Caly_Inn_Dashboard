import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/app/redux/location_Slice";
import venueReducer from "@/app/redux/venue_Slice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    venues: venueReducer,
  },
});
