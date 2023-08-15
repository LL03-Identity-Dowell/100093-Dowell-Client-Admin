import { createSlice } from "@reduxjs/toolkit";


const otherorgdata = createSlice({
	name: "otherorgdata",
	initialState: [
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
			product_link: "",
			product_logo:"",
		},
	],
	reducers: {
		getotherorgdata(_state, action) {
			console.log(_state);
			return action.payload;
		},
	},
});

export default otherorgdata.reducer;

export const { getotherorgdata } = otherorgdata.actions;
