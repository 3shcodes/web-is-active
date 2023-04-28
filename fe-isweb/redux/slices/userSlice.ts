import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {} as User | null,
    reducers: {
        loggedIn: (state, action) => {
            state = action.payload;
            return state;
        },
        logout: () => {
            return null;
        }
    }
})

export default userSlice;