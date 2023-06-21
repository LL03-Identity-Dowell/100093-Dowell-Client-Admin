import { createSlice } from "@reduxjs/toolkit";


const settingSlice = createSlice({
	name: "setting",
	initialState: {
		isSuccess: true,
		data: {
			_id: "",
			org_name: "",
			admin_id: "",
			username: "",
			default_org: "",
			maxtime_member: "",
			maxtime_user: "",
			default_language: "",
			internet_min_speed: "",
			mandatory_sections: [],
			product_plan: [
				{
					product_name: "",
					plans: "",
				},
			],
			disconn_idle: "",
			permit_to_connect: "",
			no_of_conn: "",
			processes_to_portfolio: [
				{
					process: "",
					rights: "",
					portfolios: "",
				},
			],
			uxlivinglab_method: "",
			chat_method: "",
			color_scheme: "",
		},
	},
	reducers: {
		getsetting(state, action) {
			console.log("get data");
			return action.payload;
		},
	},
});

 
export default settingSlice.reducer;

export const {getsetting}= settingSlice.actions