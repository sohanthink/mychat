import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const badgeSlice = createSlice({
  name: "grprequ",
  initialState,
  reducers: {
    grprequ: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { grprequ } = badgeSlice.actions;

export default badgeSlice.reducer;
