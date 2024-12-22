import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://chatty-app-backend.vercel.app/api",
    withCredentials: true,
})
