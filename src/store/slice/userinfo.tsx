import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

const userinfoSlice = createSlice({
  name: "userinfo",
  initialState: {
    userinfo: {
      username: "",
      first_name: "[First Name]",
      last_name: "[Last Name]",
      email: "",
      profile_img: "",
      phone: "",
      User_type: "[Designation]",
      language: "",
      city: "",
      country: "",
      status: "",
      dowell_time: "[time] [duration]",
      timezone: "",
      regional_time: "",
      server_time: "",
      userIP: "",
      userOS: "",
      userDevice: "",
      userBrowser: "",
      userID: "",
      login_eventID: "",
      client_admin_id: "",
      payment_status: "",
      user_country: " [location]",
      newsletter_subscription: null,
      Privacy_policy: null,
      org_img: "",
    },
  },
  reducers: {
    setUserInfo(_state, action) {
      return action.payload;
    },
  },
});

export default userinfoSlice.reducer;

export const { setUserInfo } = userinfoSlice.actions;
export const getUserInfo = (state: RootState) => state.userinfo;
