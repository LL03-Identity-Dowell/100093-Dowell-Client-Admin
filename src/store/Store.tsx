import { configureStore } from "@reduxjs/toolkit";
import  settingSlice  from "./slice/setting";
import loaderslice from './slice/loaderstate';
import userinfoSlice from './slice/userinfo';
import productsSlice from './slice/products';




const store = configureStore({
	reducer: {
		setting: settingSlice,
		loaderslice: loaderslice,
		userinfo: userinfoSlice,
		products: productsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;