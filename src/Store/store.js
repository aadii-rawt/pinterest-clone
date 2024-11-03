import { configureStore } from "@reduxjs/toolkit";
import statesSlice from "./Reducers/statesSlice";

export const store = configureStore({
    reducer: {
        statesSlice: statesSlice,
    },
  });