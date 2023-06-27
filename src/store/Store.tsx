import { configureStore } from "@reduxjs/toolkit";
import  settingSlice  from "./slice/setting";
import loaderslice from './slice/loaderstate';
import userinfoSlice from './slice/userinfo';

const store = configureStore({
	reducer: {
		setting: settingSlice,
		loaderslice:loaderslice,
		userinfo: userinfoSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;