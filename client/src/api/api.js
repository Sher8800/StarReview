import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './baseUrl'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = getState().user;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

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

        deleteUser: build.mutation({
            query: (id) => ({
                url: `users/user/${id}`,
                method: 'DELETE',
            })
        }),

        createComment: build.mutation({
            query: (body) => ({
                url: 'comments/create/:id',
                method: 'POST',
                body
            })
        }),

        deleteComment: build.mutation({
            // query: (id) => `comments/remove/${id}`
            query: (id) => ({
                url: `comments/remove/${id}`,
                method: 'DELETE',
            })
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
    useDeleteUserMutation,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetAllCommentsQuery
} = api 