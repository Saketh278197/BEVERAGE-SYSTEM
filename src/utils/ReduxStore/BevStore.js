// utils/ReduxStore/bevStore.js
import { configureStore } from "@reduxjs/toolkit";
import beveragesReducer from "./BevSlice";
import authReducer from "./AuthSlice"; 

const bevStore = configureStore({
  reducer: {
    Beverage: beveragesReducer,
    auth: authReducer, 
  },
});

export default bevStore;
