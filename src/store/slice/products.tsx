import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
	name: "products",
	initialState: {
		"products": [
			{
				"_id": "6475ed8b5ebadafe05d578bb",
				"product_name": "Workflow AI",
				"product_logo": "https://100093.pythonanywhere.com/media/productlogos/Workflow-AI-2.png",
				"product_link": "https://ll04-finance-dowell.github.io/workflowai.online/#",
				"product_status": "paid",
				"team_members_status": "enable",
				"users_status": "enable",
				"public_status": "enable",
				"paid_members": [
					{
						"username": "Jazz3650",
						"owner": "Jazz3650",
						"first_name": "Jazz3650",
						"org_name": "Jazz3650",
						"status": "disable",
						"invite_users": "false",
						"invite_team_members": "false",
						"invite_public": "true"
					},
					{
						"username": "Nagarajuvuliki",
						"owner": "Nagarajuvuliki",
						"org_name": "Nagarajuvuliki",
						"invite_users": "true",
						"invite_team_members": "false",
						"invite_public": "false",
						"status": "disable"
					}
				],
				"unpaid_members": []
			},]},
	reducers: {
		getproducts(_state, action) {
			
			return action.payload;
		},
	},
});

 
export default productsSlice.reducer;

export const {getproducts}= productsSlice.actions