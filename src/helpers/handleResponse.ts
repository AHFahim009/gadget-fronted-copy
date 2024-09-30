/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorRes, TGenericResponse } from "@/applicationTypes";
import { toast } from "sonner";

export const handleResponse = (res: any) => {
    if (res.data) {
        const result = res.data as TGenericResponse;
        return result
    } else if (res?.error) {
        const errorRes = res.error as TGenericErrorRes;
        toast.message(errorRes.message);
    }
};

export default handleResponse;
