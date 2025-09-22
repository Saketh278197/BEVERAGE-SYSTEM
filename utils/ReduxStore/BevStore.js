import { configureStore } from "@reduxjs/toolkit";
import beveragesReducer from "../ReduxStore/BevSlice";

const bevStore = configureStore({
  reducer: {
    Beverage: beveragesReducer,
  },
});

export default bevStore;
