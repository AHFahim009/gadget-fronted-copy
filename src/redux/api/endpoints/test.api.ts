import baseApi from "../baseApi";
const testApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        testApi: builder.mutation({
            query: (payload) => ({
                url: '/testing',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
})


export const { useTestApiMutation } = testApi