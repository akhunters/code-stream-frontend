import { AxiosError } from "axios";

interface AxiosErrorData {
    message: {
        message: string;
    }
}

export type CustomAxiosError = AxiosError<AxiosErrorData>;