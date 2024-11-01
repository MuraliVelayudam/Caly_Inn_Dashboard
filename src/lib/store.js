import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/app/redux/location_Slice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
