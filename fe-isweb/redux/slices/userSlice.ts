import { createSlice } from "@reduxjs/toolkit";





const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        loggedIn: (state, action) => {
            state = action.payload;
            return state;
        },
        logout: () => {
            localStorage.removeItem("user");
            return null;
        }
    }
})

export default userSlice;