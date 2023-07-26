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
		con_type: {
			"Others not listed above": "",
			"Office Wifi/Secured Wifi": "",
			"Public Wifi": "",
			"Mobile Data": "",
		},
		login_type: {
			"User Name & Password": "",
			"Biometric ID": "",
			"Voice ID": "",
			"Video ID": "",
			"Face ID": "",
			"Others not listed above": "",
		},
		password_strength: {
			"Minimum 8 characters": "",
			"Minimum 16 characters": "",
			"Minimum 12 characters": "",
			"Minimum 10 characters": "",
			"Others not listed above": "",
		},
		idverify: {
			"Verified ID": "",
			"ID not verified": "",
			"Phone number verified": "",
			"Phone number not verified": "",
			"Email verified": "",
			"Email not verified": "",
			"Others not listed above": "",
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
		getlayercontype(state, action) {
			state.con_type = action.payload;
		},
		getlayerlogintype(state, action) {
			state.login_type = action.payload;
		},
		getlayerpasswordstrength(state, action) {
			state.password_strength = action.payload;
		},
		getlayerverifyid(state, action) {
			state.idverify = action.payload;
		},
	},
});

export default layerSlice.reducer;

export const {
	getlayeros,
	getlayerdevices,
	getlayerbrowsers,
	getlayercontype,
	getlayerlogintype,
	getlayerpasswordstrength,
	getlayerverifyid
} = layerSlice.actions;
