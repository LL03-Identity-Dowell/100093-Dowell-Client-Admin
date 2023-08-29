import { createSlice } from "@reduxjs/toolkit";

const portfolioNotificationSlice = createSlice({
  name: "portfolioNotifications",
  initialState: {
    notifications: [
      {
        username: "",
        product: "",
      },
    ],
  },
  reducers: {
    getportfolioNotifications(_state, action) {
      // console.log(_state);
      return action.payload;
    },
  },
});

export default portfolioNotificationSlice.reducer;

export const { getportfolioNotifications } = portfolioNotificationSlice.actions;
