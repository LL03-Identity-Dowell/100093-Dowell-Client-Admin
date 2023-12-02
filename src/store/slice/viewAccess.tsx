import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  {
    "User Management": {
      rights: "",
      portfolios: [],
    },
  },
  {
    "Member Management": {
      rights: "",
      portfolios: [],
    },
  },
  {
    "Portfolio Management": {
      rights: "",
      portfolios: [],
    },
  },
];
const viewAccessSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getViewAccess(_state, action) {
      return action.payload;
    },
  },
});

export default viewAccessSlice.reducer;

export const { getViewAccess } = viewAccessSlice.actions;
