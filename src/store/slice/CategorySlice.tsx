import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {
        "name":[]
    },
  },
  reducers: {
    getCategory(_state, action) {
      return action.payload;
    },
  },
});

export default categorySlice.reducer;

export const { getCategory } = categorySlice.actions;
