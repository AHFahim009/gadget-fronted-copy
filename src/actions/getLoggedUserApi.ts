import { TGenericResponse } from "@/applicationTypes";
import axiosInstance from "@/axios/axiosInstance";

export const getLoggedUserApi = async () => {
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/loggedUser`)
        return res.data as TGenericResponse
    } catch (error) {
        console.log(error);

        // return toast.error(error.message)
    }

}

export const logOut = async () => {
    try {
        const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`)
        return res.data as TGenericResponse
    } catch (error) {
        console.log(error);

        // return toast.error(error.message)
    }

}
export const googleLogin = async (email: string) => {
    try {
        const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/${email}`)
        return res.data as TGenericResponse
    } catch (error) {
        console.log(error);

        // return toast.error(error.message)
    }

}