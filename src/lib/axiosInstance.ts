// import { authApi } from "@/app/features/api";
import axios from "axios";
// import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    // const originalRequest = error.config;

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   // 👉 redirect ไป login
    //   window.location.href = "/auth/login";
    // }
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      if (currentPath !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;