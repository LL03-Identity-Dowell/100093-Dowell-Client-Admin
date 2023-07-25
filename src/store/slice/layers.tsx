import { createSlice } from "@reduxjs/toolkit";

const layerSlice = createSlice({
	name: "layer",
	initialState: {
		os: {
			"Mac OS": "",
			Linux: "",
			Windows: "",
			Android: "",
			IOS: "",
			"Others not listed above": "",
		},
		devices: {
			"Laptop/Desktop": "",
			"Others not listed above": "",
			"Mobile Phone": "",
			"Tablet/Ipad": "",
		},
		browsers: {
			Chrome: "",
			Firefox: "",
			"Others not listed above": "",
			Edge: "",
			Safari: "",
			Bing: "",
			Opera: "",
		},
	},
	reducers: {
		getlayeros(state, action) {
			state.os = action.payload;
		},
		getlayerdevices(state, action) {
			state.devices = action.payload;
		},
		getlayerbrowsers(state, action) {
			state.browsers = action.payload;
		},
	},
});

export default layerSlice.reducer;

export const { getlayeros, getlayerdevices, getlayerbrowsers } = layerSlice.actions;
