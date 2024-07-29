import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [
      {category_name: "", links: []}
    ]
    ,
  },
  reducers: {
    getCategory(state, action) {
      state.category=action.payload
    },
  },
});

export default categorySlice.reducer;

export const { getCategory } = categorySlice.actions;
