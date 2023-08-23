import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = () => {
  const token = Cookies.get("token");
  return token;
};
