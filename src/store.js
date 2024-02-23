import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import badgeSlice from "./slices/badgeSlice";

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice.reducer,
    grprequbadge: badgeSlice.reducer,
  },
});
