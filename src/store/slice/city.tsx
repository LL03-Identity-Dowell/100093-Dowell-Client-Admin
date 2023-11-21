import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "country",
  initialState: {
    country_code: null,
    cities: [
      {
        id: "",
        name: "",
        country: "",
      },
    ],
  },
  reducers: {
    getCities(state, action) {
      state.cities = action.payload;
    },
    getCountryCode(state, action) {
      state.country_code = action.payload;
    },
  },
});

export default citySlice.reducer;

export const { getCities, getCountryCode } = citySlice.actions;
