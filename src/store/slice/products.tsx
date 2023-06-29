import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      {
        _id: "",
        product_name: "",
        product_logo: "",
        product_link: "",
        product_status: "",
        team_members_status: "",
        users_status: "",
        public_status: "",
        paid_members: [
          {
            username: "",
            owner: "",
            first_name: "",
            org_name: "",
            status: "",
            invite_users: false,
            invite_team_members: false,
            invite_public: true,
          },
          {
            username: "",
            owner: "",
            org_name: "",
            invite_users: true,
            invite_team_members: false,
            invite_public: false,
            status: "",
          },
        ],
        unpaid_members: [],
      },
    ],
  },
  reducers: {
    getproducts(_state, action) {
      return action.payload;
    },
  },
});

export default productSlice.reducer;

export const { getproducts } = productSlice.actions;
