import { createSlice } from "@reduxjs/toolkit";

const sidebarslice = createSlice({
	name: "sidebar",
	initialState: {
		workspace: [],
		lastlogin: [[]],
	},
	reducers: {
		getsidebarworkspace(state, action) {
			state.workspace = action.payload;
		},
		getsidebarlastlogin(state, action) {
			state.lastlogin = action.payload;
		},
	},
});

export default sidebarslice.reducer;

export const { getsidebarworkspace, getsidebarlastlogin } = sidebarslice.actions;
