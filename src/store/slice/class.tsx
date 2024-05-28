import { createSlice } from "@reduxjs/toolkit";

const schoolClassSlice = createSlice({
  name: "schoolClass",
  initialState: {
    schoolClass: {
        "workspace_id":"",
        "class_name":"",
        "portfolio":""
    },
  },
  reducers: {
    getschoolclass(_state, action) {
      return action.payload;
    },
  },
});

export default schoolClassSlice.reducer;

export const { getschoolclass } = schoolClassSlice.actions;
