/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPaginationResult<> {
    totalDocuments: number;
    limitPage: number;
    currentPage: number;
    totalPage: number
}

export type TGenericResponse = {
    status: number;
    success: boolean;
    message: string;
    data: any;
    accessToken: string;
    metaData?: IPaginationResult
}
export type TGenericErrorRes = {
    status: number;
    success: boolean;
    message: string;
    error: any;
};

export type TUser = {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
};