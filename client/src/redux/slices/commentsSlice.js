import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },

        addComment: (state, action) => {
            state.comments.push(action.payload)
        },

        removeComment: (state, action) => {
            const commentId = action.payload;
            state.comments = state.comments.filter(comment => comment._id !== commentId)
        },

        // clearCommentsFromLocalStorage: (state, action) => {
        //     state.comments = []
        // },
    }
})

export const commentsSelector = state => state.comments;
export const { setComments, addComment, removeComment, clearCommentsFromLocalStorage } = commentsSlice.actions;
export default commentsSlice.reducer;