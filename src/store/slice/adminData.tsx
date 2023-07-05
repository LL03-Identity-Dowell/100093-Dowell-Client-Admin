import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "adminData",
  initialState: [],
  reducers: {
    getAdminData(_state, action) {
      return action.payload;
    },
  },
});

export default adminDataSlice.reducer;

export const { getAdminData } = adminDataSlice.actions;
