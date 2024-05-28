import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
  name: "bus",
  initialState: {
    bus: {
        "workspace_id":"",
        "class_name":"",
        "portfolio":""
    },
  },
  reducers: {
    getbus(_state, action) {
      return action.payload;
    },
  },
});

export default busSlice.reducer;

export const { getbus } = busSlice.actions;
