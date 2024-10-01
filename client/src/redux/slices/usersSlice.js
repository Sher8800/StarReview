import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers(state, { payload }) {
            state.users = payload.users
        },

        removeUsersComments(state, { payload }) {
            // state.email = null
        }
    }
})

export const usersSelector = state => state.users;
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;