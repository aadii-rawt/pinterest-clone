import { combineReducers, configureStore } from "@reduxjs/toolkit";
import statesSlice from "./Reducers/statesSlice";
import userSlice from "./Reducers/userReducer";

const reducer = combineReducers({
    statesSlice: statesSlice,
    userSlice: userSlice
  })

export const store = configureStore({reducer});