import { createSlice } from "@reduxjs/toolkit";
const selectedorg = createSlice({
	name: "selectedorg",
	initialState: {
        type: '',
        orgname: '',
      },
	reducers: {
		getselectedorgs(_state, action) {
			
			return action.payload;
		},
	},
});

export default selectedorg.reducer;

export const { getselectedorgs } = selectedorg.actions;