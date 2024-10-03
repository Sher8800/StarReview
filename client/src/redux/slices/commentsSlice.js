import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload;
        },

    }
})

export const commentsSelector = state => state.user;
export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;