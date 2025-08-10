import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./reducer/dashboardSlice";
import dataReducer from "./reducer/dataSlice";

export const store = configureStore({
    reducer: { dashboard: dashboardReducer, data: dataReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
