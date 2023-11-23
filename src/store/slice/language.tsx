import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: [
    {
        "layer": "",
        "language": ""
    }],
  reducers: {
    getLanguage(_state, action) {
      return action.payload;
    },
  },
});

export default languageSlice.reducer;

export const { getLanguage } = languageSlice.actions;
