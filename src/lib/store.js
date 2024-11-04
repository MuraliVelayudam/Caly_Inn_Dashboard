import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/app/redux/location_Slice";
import venueReducer from "@/app/redux/venue_Slice";
import memberReducer from "@/app/redux/team_Slice";
import leadReducer from "@/app/redux/lead_Slice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    venues: venueReducer,
    members: memberReducer,
    leads: leadReducer,
  },
});
