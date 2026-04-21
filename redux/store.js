import { configureStore } from "@reduxjs/toolkit";
import { dashboardReducer } from "@/redux/slices/dashboardSlice";
import { notificationReducer } from "@/redux/slices/notificationSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    notifications: notificationReducer,
  },
});
