import { createSlice } from "@reduxjs/toolkit";
const organizationsslice = createSlice({
	name: "org",
	initialState: [
      {
        type: '',
        orgname: '',
      }
    ],
	reducers: {
		getorgs(_state, action) {
			
			return action.payload;
		},
	},
});

export default organizationsslice.reducer;

export const { getorgs } = organizationsslice.actions;