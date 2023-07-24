import { userReducer } from "./reducers/index"; // index.js file in reducers folder
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    likes: userReducer,
    matches: userReducer,
  },
});

export default store;
