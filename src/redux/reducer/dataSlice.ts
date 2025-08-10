import { createSlice } from "@reduxjs/toolkit";
interface DataProps {
    name: string;
    value: number;
}
interface DataState {
    data: DataProps[];
    error: string | null;
    loading: boolean;
}

const initialState: DataState = {
    data: [],
    error: null,
    loading: false,
};

const sampleData = [
    {
        id: "b43e07ac-1fab-4e52-9c6f-de3657b6c556",
        data: Array.from({ length: 7 }, (_, i) => ({
            name: `Day ${i + 1}`,
            value: Math.floor(Math.random() * 100),
        })),
    },
    {
        id: "5a8c4bfe-8414-47e0-ba30-891d6b6677a4",
        data: Array.from({ length: 12 }, (_, i) => ({
            name: `Month ${i + 1}`,
            value: Math.floor(Math.random() * 100),
        })),
    },
    {
        id: "8b9a97ed-e377-4fd6-a302-e167e6b98284",
        data: Array.from({ length: 12 }, (_, i) => ({
            name: `Months ${i + 1}`,
            value: Math.floor(Math.random() * 100),
        })),
    },
    {
        id: "990b4523-d069-4147-8e5f-e9d57ac6ee14",
        data: [
            { name: "Jan", value: 400 },
            { name: "Feb", value: 300 },
        ],
    },
];

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        getDataById: (state, action) => {
            const selectedData = sampleData.find((item) => item.id === action.payload);

            if (selectedData) {
                state.data = selectedData.data;
                state.error = null;
            } else {
                state.error = "Data not found";
            }
        },
    },
});
export const { getDataById } = dataSlice.actions;
export default dataSlice.reducer;
