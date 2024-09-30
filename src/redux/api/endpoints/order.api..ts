import { tagTypes } from "@/redux/tagTypes";
import baseApi from "../baseApi";
import { TOrder } from "@/applicationTypes/applicationTypes";



const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (payload: TOrder) => ({
                url: '/orders/create-order',
                method: 'POST',
                data: payload
            }),
            invalidatesTags: [tagTypes.order]
        }),

        getMyOrder: builder.query({
            query: ({ userId, page }: { userId: string, page: number }) => ({
                url: `/orders/myOrder/${userId}`,
                method: 'GET',
                params: {
                    page: page
                }
            }),
            providesTags: [tagTypes.product]
        }),




    }),
})


export const { useCreateOrderMutation, useGetMyOrderQuery } = orderApi