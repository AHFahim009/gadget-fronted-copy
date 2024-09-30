import { tagTypes } from "@/redux/tagTypes";
import baseApi from "../baseApi";
import { Role } from "@/components/admin/users/UserAction";

interface IQuery {
    searchTerm?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (payload) => ({
                url: '/auth/create-user',
                method: 'POST',
                data: payload
            }),
            invalidatesTags: [tagTypes.user]
        }),
        loginUser: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                data: payload
            }),
        }),
        getAllUsers: builder.query({
            query: ({ limit, page, searchTerm, sortField, sortOrder }: IQuery) => {
                const params = new URLSearchParams({
                    limit: limit!.toString(),
                    page: page!.toString(),
                    searchTerm: searchTerm || "",
                    sortField: sortField!.toString(),
                    sortOrder: sortOrder!
                }).toString();

                return {
                    url: `/auth/get-all-Users?${params}`,
                    method: 'GET',
                }

            },
            providesTags: [tagTypes.user]
        }),

        updateUserRole: builder.mutation({
            query: ({ userId, role }: { userId: string; role: Role }) => {
                console.log({ role });

                return {
                    url: `/auth/user/${userId}`,
                    method: 'PUT',
                    data: { role },
                }
            },
            invalidatesTags: [tagTypes.user]
        }),
        googleLogin: builder.query({
            query: ({ email }: { email: string }) => {

                return {
                    url: `/auth/google/${email}`,
                    method: 'GET',
                }
            },
        }),
        deleteUser: builder.mutation({
            query: (userId: string) => {

                return {
                    url: `/auth/user/${userId}`,
                    method: 'DELETE',

                }
            },
            invalidatesTags: [tagTypes.user]
        }),



    }),
})


export const { useCreateUserMutation, useLoginUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation, useLazyGoogleLoginQuery } = authApi