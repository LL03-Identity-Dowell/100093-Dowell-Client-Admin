import { createSlice } from "@reduxjs/toolkit";

const viewAccessSlice = createSlice({
  name: "setting",
  initialState: false,
  reducers: {
    getViewAccess(state, action) {
      console.log("action payload", action.payload);
      state = action.payload;
      return state;
    },
  },
});

export default viewAccessSlice.reducer;

export const { getViewAccess } = viewAccessSlice.actions;
