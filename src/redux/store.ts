"use client"
import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import userSlice from "./slices/user.slice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import cartSlice from "./slices/cart.slice";

const persistedUserConfig = {
    key: 'root',
    storage,
    // Optionally, you can blacklist or whitelist specific reducers
    // blacklist: ['someReducer']
    // whitelist: ['someReducer']
};



const persistedUserSlice = persistReducer(persistedUserConfig, userSlice.reducer);
const persistedCartSlice = persistReducer(persistedUserConfig, cartSlice.reducer);



export const store = configureStore({
    reducer: {
        [userSlice.reducerPath]: persistedUserSlice,
        [cartSlice.reducerPath]: persistedCartSlice,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
