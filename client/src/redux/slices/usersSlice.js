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

        addUser(state, action) {
            state.users.push(action.payload)
        },

        addCommentToUser(state, action) {
            const { userId, comment } = action.payload;
            const user = state.users.find(user => user._id === userId);
            if (user) {
                user.comments.push(comment);
            }
        },

        removeUsers(state, action) {
            console.log(action.payload);

            const userId = action.payload;
            console.log(userId);
            state.users = state.users.filter(user => user._id !== userId);
        },

        removeUsersComments(state, action) {
            // state.email = null
        }
    }
})

export const usersSelector = state => state.users;
export const { getUsers, addUser, addCommentToUser, removeUsers, removeUsersComments } = usersSlice.actions;
export default usersSlice.reducer;