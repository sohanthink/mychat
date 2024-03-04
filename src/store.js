import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { chatSlice } from "./slices/activechat/activechatSlice";

export const store = configureStore({
  reducer: {
    loginuserdata: userSlice.reducer,
    activechat: chatSlice.reducer,
  },
});
