import { createSlice } from "@reduxjs/toolkit";

const languagedataSlice = createSlice({
	name: "language",
	initialState: {
		username: "",
		langdata: [
			{
				language: "",
				layer: "",
			}
		],
	},
	reducers: {
		getAlllangData(state, action) {
			state.langdata = action.payload;
			return state;
		},
		getlangData(state, action) {
			let isThere = false;
			state.langdata.forEach((item, index) => {
				if (item.language === action.payload.language) {
					state.langdata[index] = {
						...item,
						...action.payload,
					};
					isThere = true;
				}
			});
			if (!isThere) {
				
					state.langdata = [
						...state.langdata,
						{
							...action.payload,
							
						},
					];
				
			}

			return state;
		},
		
		getlangUsername(state, action) {
			state.username = action.payload;
			return state;
		},
	},
});

export default languagedataSlice.reducer;

export const { getAlllangData, getlangData,  getlangUsername } =
	languagedataSlice.actions;
