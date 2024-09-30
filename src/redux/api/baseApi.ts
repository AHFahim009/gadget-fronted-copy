// src/services/api.js
import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagProviders } from "../tagTypes";

const baseApi = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL as string,
    }),
    endpoints: () => ({}),
    tagTypes: tagProviders
});

export default baseApi;
