import { CustomAxiosError } from "@/types/axios.type"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAxiosErrorMessage(error: CustomAxiosError): string {
  return error?.response?.data?.message?.message || "Something went wrong, please try again later"
}