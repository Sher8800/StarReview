import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload
        },

        addUser: (state, action) => {
            state.users.push(action.payload)
        },

        addCommentToUser: (state, action) => {
            const { recipientId, commentId } = action.payload;

            const recipientComment = state.users.find(user => user._id === recipientId);

            if (recipientComment) {
                recipientComment.comments.push(commentId);
            } else {
                console.error(`User with ID ${recipientId} not found`);
            }
        },


        removeUsers: (state, action) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user._id !== userId);
        },

        removeUserComment: (state, action) => {

            const { recipientId, commentId } = action.payload;

            const recipientComment = state.users.find(user => user._id === recipientId);

            if (recipientComment) {
                recipientComment.comments.filter(comment => comment !== commentId)
            } else {
                console.error(`User with ID ${recipientId} not found`);
            }
        },

        // clearUsersFromLocalStorage: (state, action) => {
        //     state.users = []
        // },
    }
})

export const usersSelector = state => state.users;
export const {
    getUsers,
    addUser,
    addCommentToUser,
    removeUsers,
    removeUserComment,
    clearUsersFromLocalStorage
} = usersSlice.actions;
export default usersSlice.reducer;