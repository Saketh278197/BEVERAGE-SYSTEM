// utils/ReduxStore/bevStore.js
import { configureStore } from "@reduxjs/toolkit";
import beveragesReducer from "./BevSlice";
import authReducer from "./authSlice"; // ✅ import auth reducer

const bevStore = configureStore({
  reducer: {
    Beverage: beveragesReducer,
    auth: authReducer, // ✅ include auth slice in store
  },
});

export default bevStore;
