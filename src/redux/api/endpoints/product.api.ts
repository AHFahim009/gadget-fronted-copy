import { tagTypes } from "@/redux/tagTypes";
import baseApi from "../baseApi";



const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (payload) => ({
                url: '/products/create-product',
                method: 'POST',
                data: payload
            }),
            invalidatesTags: [tagTypes.product]
        }),

        getAllProducts: builder.query({
            query: () => ({
                url: '/products',
                method: 'GET',
            }),
            providesTags: [tagTypes.product]
        }),
        getSingleProducts: builder.query({
            query: ({ productId }: { productId: string }) => ({
                url: `/products/${productId}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.product]
        }),




    }),
})


export const { useCreateProductMutation, useGetAllProductsQuery, useGetSingleProductsQuery } = productApi