import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
  name: "country",
  initialState: [
    {
      id: "",
      name: "",
      country_code: "",
      country_short: "",
    },
  ],
  reducers: {
    getCountry(_state, action) {
      return action.payload;
    },
  },
});

export default countrySlice.reducer;

export const { getCountry } = countrySlice.actions;
