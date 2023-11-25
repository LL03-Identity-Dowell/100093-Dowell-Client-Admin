import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "country",
  initialState: [
    {
      country_code: null,
      cities: [
        {
          id: "",
          name: "",
          country: "",
        },
      ],
    },
  ],
  reducers: {
    getCities(state, action) {
      if (state[0].country_code === null) {
        return (state = [action.payload]);
      } else {
        return (state = [...state, action.payload]);
      }
    },
  },
});

export default citySlice.reducer;

export const { getCities } = citySlice.actions;
