import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseUrl'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

    endpoints: (build) => ({

        registration: build.mutation({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body
            })
        }),

        login: build.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),

        getAllUsers: build.query({
            query: () => 'users/getAllUsers'
        }),

        deleteUser: build.query({
            query: (id) => `users/user/${id}`
        }),

        createComment: build.mutation({
            query: (body, id) => ({
                url: `comments/create/${id}`,
                method: 'POST',
                body
            })
        }),

        deleteComment: build.query({
            query: (id) => `comments/remove/${id}`
        }),

        getAllComments: build.query({
            query: () => 'comments/getAllComments'
        }),

    })
})

export const {
    useRegistrationMutation,
    useLoginMutation,
    useGetAllUsersQuery,
    useDeleteUserQuery,
    useCreateCommentMutation,
    useDeleteCommentQuery,
    useGetAllCommentsQuery
} = api 