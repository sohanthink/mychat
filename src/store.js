import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import badgeSlice from "./slices/badgeSlice";
import { chatSlice } from "./slices/activechat/activechatSlice";

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice.reducer,
    activeChat: chatSlice.reducer,
  },
});
