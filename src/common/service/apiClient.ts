import axios, { AxiosError, AxiosResponse } from "axios";
import { refreshToken } from "./authService";


interface ApiError{
    message: string;
    status?: number;
    data?: any
}

const apiClient = axios.create({
    baseURL: "http://localhost:8888/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const handleApiError = (error:unknown): ApiError => {
    if(error instanceof AxiosError){
        const response = error.response;
        if(response){
            return {
                message: response.data?.message || "Co loi xay ra",
                status: response.status,
                data: response.data,
            };
        }
        return {
            message: "Khong the ket noi den server. Vui long kiem tra ket noi mang",
        };
    }
    return {
        message: "Da xay ra loi khong xac dinh. vui long thu lai sau",
    };
};

let isRefreshing = false; 
let refreshSubcribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubcribers.push(cb);
}
function onRefreshed(token: string){
    refreshSubcribers.forEach((cb) => cb(token));
    refreshSubcribers = []
}

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if(error.response?.status === 401 && !originalRequest._retry && localStorage.getItem("refreshToken")) {
            originalRequest._retry = true;
            if(!isRefreshing) {
                isRefreshing = true;
                try {
                    const data = await refreshToken();
                    localStorage.setItem("accessToken", data.accessToken);
                    onRefreshed(data.accessToken);
                    isRefreshing = false;
                } catch (error) {
                    isRefreshing = false;
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((token: string)=> {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    resolve(apiClient(originalRequest));
                });
            });
        }
        return Promise.reject(handleApiError(error))
    }
);

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

export default apiClient