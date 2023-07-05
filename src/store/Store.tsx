import { configureStore } from "@reduxjs/toolkit";
import  settingSlice  from "./slice/setting";
import loaderslice from './slice/loaderstate';
import userinfoSlice from './slice/userinfo';
import productSlice from './slice/products';
import adminDataSlice from './slice/adminData';

const store = configureStore({
	reducer: {
		setting: settingSlice,
		loaderslice: loaderslice,
		userinfo: userinfoSlice,
		products: productSlice,
		adminData: adminDataSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;