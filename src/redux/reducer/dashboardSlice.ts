import { createSlice } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";


const initialState: Dashboard = {
    username: "",
    dashboardId: "",
    dashboardItem: [],
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        addDashboardItem: (state, action) => {
            const newItemId = uuidv4();
            const defaultSize = { w: 6, h: 4 };

            const newLayoutItem: Layout = {
                i: newItemId,
                x: (state.dashboardItem.length * 2) % 12,
                y: Math.floor(state.dashboardItem.length / 6) * 4,
                w: defaultSize.w,
                h: defaultSize.h,
            };

            const newItem: DashboardItem = {
                title: action.payload.title,
                id: newItemId,
                type: action.payload.type,
                dataId: action.payload.dataId || null, // Optional field to link to data source
                layout: {
                    ...newLayoutItem,
                },
            };
            state.dashboardItem.push(newItem);
        },
        updateDashboardItem: (state, action) => {
            const selectedItemIndex = state.dashboardItem.findIndex(
                (item: DashboardItem) => item.layout.i === action.payload.id,
            );

            if (selectedItemIndex !== -1) {
                state.dashboardItem[selectedItemIndex] = {
                    ...state.dashboardItem[selectedItemIndex],
                    ...action.payload,
                };
            }
        },
    },
});
export const { addDashboardItem, updateDashboardItem } = dashboardSlice.actions;
export default dashboardSlice.reducer;
