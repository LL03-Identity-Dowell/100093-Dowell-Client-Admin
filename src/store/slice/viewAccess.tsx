import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
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

// [
//   {
//     "User Management": {
//       rights: "",
//       portfolios: [],
//     },
//   },
//   {
//     "Member Management": {
//       rights: "",
//       portfolios: [],
//     },
//   },
//   {
//     "Portfolio Management": {
//       rights: "",
//       portfolios: [],
//     },
//   },
// ]
