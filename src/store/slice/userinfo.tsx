import { createSlice } from "@reduxjs/toolkit";

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
    portfolio_info: [
      {
        username: [],
        member_type: "",
        product: "",
        data_type: "",
        operations_right: "",
        role: "",
        security_layer: "",
        portfolio_name: "",
        portfolio_code: "",
        portfolio_specification: "",
        portfolio_uni_code: "",
        portfolio_details: "",
        status: "",
        org_id: "",
        org_name: "",
      },
    ],
    userportfolio: [],
    members: {
      team_member: [
        {
          name: "",
          first_name: "",
          last_name: "",
          email: "",
          portfolio_name: "",
        },
      ],
      guest_members: [
        {
          name: "",
          member_code: "",
          member_spec: "",
          member_uni_code: "",
          member_details: "",
          status: "",
          first_name: "",
          last_name: "",
          email: "",
          alias: "",
        },
      ],
      public_members: [],
    },
    own_organisations: [
      {
        org_name: "[Organization]",
      },
    ],
    other_org: [
      {
        org_id: "",
        org_name: "",
        username: "",
        member_type: "",
        product: "",
        data_type: "",
        operations_right: "",
        role: "",
        security_layer: "",
        portfolio_name: "",
        portfolio_code: "",
        portfolio_specification: "",
        portfolio_uni_code: "",
        portfolio_details: "",
        status: "",
      },
    ],
  },
  reducers: {
    getuserinfo(_state, action) {
      return action.payload;
    },
  },
});

export default userinfoSlice.reducer;

export const { getuserinfo } = userinfoSlice.actions;
