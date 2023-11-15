import { createSlice } from "@reduxjs/toolkit";
const overlaysidebarslice = createSlice({
	name: "overlaysidebar",
	initialState: false,
	reducers: {
		getoverlaysidebar(_state, action) {
			return action.payload;
		},
	},
});

export default overlaysidebarslice.reducer;

export const { getoverlaysidebar } = overlaysidebarslice.actions;
