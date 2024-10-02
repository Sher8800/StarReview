import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    email: null,
    id: null,
    token: null,
    roles: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.roles = action.payload.roles;
        },

        exit(state) {
            state.username = null;
            state.email = null;
            state.id = null;
            state.token = null;
            state.roles = null;
        }
    }
})

export const userSelector = state => state.user;
export const { setUser, exit } = userSlice.actions;
export default userSlice.reducer;