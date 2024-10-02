import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers(state, action) {
            state.users = action.payload
        },

        removeUsersComments(state, { payload }) {
            // state.email = null
        }
    }
})

export const usersSelector = state => state.users;
export const { getUsers, removeUser } = usersSlice.actions;
export default usersSlice.reducer;