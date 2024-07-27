import { createSlice } from "@reduxjs/toolkit";
const selectedcat = createSlice({
  name: "selectedorg",
  initialState: {
    category_name: "",
  },
  reducers: {
    getselectedcat(_state, action) {
      return action.payload;
    },
  },
});

export default selectedcat.reducer;

export const { getselectedcat } = selectedcat.actions;
