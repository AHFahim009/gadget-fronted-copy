/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorRes, TGenericResponse } from "@/applicationTypes";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
    headers: {
        'Content-Type': 'application/json', // Set default Content-Type for all requests

    },
    withCredentials: true
});

// Modify the request and response using Axios interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config
    },
    (error) => {
        // Handle request errors here
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {


        // Modify the response here
        const modifiedResponse: TGenericResponse = {
            status: response.status,
            success: response.data?.success,
            message: response.data?.message,
            data: response.data?.data,
            accessToken: response.data?.accessToken,
            metaData: response.data?.metaData
        };
        response.data = modifiedResponse;
        return response
    },
    (error) => {
        console.log(error);

        const modifiedError: TGenericErrorRes = {
            status: error.response?.status || 500,
            success: false,
            message: error.response?.data?.message || "An unexpected error occurred",
            error: error.response?.data?.error || "Error details not available",
        };

        return Promise.reject(modifiedError);
    }
);

export default axiosInstance