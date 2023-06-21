import { configureStore } from "@reduxjs/toolkit";
import  settingSlice  from "./slice/setting";

const store = configureStore({
    reducer: {
       setting: settingSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;