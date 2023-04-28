import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import sitesSlice from "./slices/sitesSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        sites: sitesSlice.reducer,
    }
});

export default store;