import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./slice/setting";
import loaderslice from "./slice/loaderstate";
import userinfoSlice from "./slice/userinfo";
import productSlice from "./slice/products";
import adminDataSlice from "./slice/adminData";
import layerSlice from "./slice/layers";
import sidebarslice from "./slice/sidebar";
import organization from "./slice/organization";
import selectedorg from "./slice/selectedorg";
import otherorgdata from "./slice/otherorgdata";
import portfolioNotificationSlice from './slice/portfolioNotifications';
import overlaysidebarslice from './slice/overlaysidebar';

const store = configureStore({
  reducer: {
    setting: settingSlice,
    loaderslice: loaderslice,
    overlaysidebar:overlaysidebarslice,
    userinfo: userinfoSlice,
    products: productSlice,
    adminData: adminDataSlice,
    layer: layerSlice,
    sidebar: sidebarslice,
    org: organization,
    selectedorg: selectedorg,
    otherorgdata: otherorgdata,
    getportfolioNotifications: portfolioNotificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
