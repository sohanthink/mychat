import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // activechat: localStorage.getItem("connectedfriend")
  //   ? JSON.parse(localStorage.getItem("connectedfriend"))
  //   : null,
  activechat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activechat: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activechat } = chatSlice.actions;

export default chatSlice.reducer;
