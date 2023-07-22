import { createSlice } from "@reduxjs/toolkit";

const layerSlice = createSlice({
	name: "layer",
	initialState: {
		devices: [{ devices: "", layer: "" }],
		os: [{ os: "", layer: "" }],
		browsers: [{ browsers: "", layer: "" }],
		location: [{ location: "", layer: "" }],
	},
	reducers: {
		getlayerdevices(state, action) {
			state.devices = action.payload;
		},
		getlayeros(state, action) {
			state.os = action.payload;
		},

		getlayerbrowsers(state, action) {
			state.browsers = action.payload;
		},
		getlayerlocation(state, action) {
			state.location = action.payload;
		},
	},
});

export default layerSlice.reducer;

export const { getlayerdevices, getlayeros, getlayerbrowsers, getlayerlocation } =
	layerSlice.actions;
