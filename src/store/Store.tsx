import { configureStore } from "@reduxjs/toolkit";
import  settingSlice  from "./slice/setting";
import loaderslice from './slice/loaderstate';

const store = configureStore({
	reducer: {
		setting: settingSlice,
		loaderslice:loaderslice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;