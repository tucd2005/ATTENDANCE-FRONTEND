import { LoginPayload, RegisterPayload, UserResponse } from "../types/auth-user.types";
import apiClient from "./apiClient"


export const registerUser = async (payload: RegisterPayload): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>("/auth/register",payload);
    return response.data
}

export const loginUser = async(payload: LoginPayload):Promise<any> => {
    const response = await apiClient.post<UserResponse>("/auth/login", payload);
    return response.data
};

export const forgotPassword = async (payload:{email: string}) => {
    const response = await apiClient.post("/auth/forgot-password", payload);
    return response.data;
}

export const refreshToken = async() : Promise<{accessToken: string}> => {
    const response = await apiClient.post("/auth/refesh-token");
    return response.data.data
}

export const resetPassword = async({
    resetToken, 
    newPassword,
} : {
    resetToken: string;
    newPassword: string;
}) => {
    const respone = await apiClient.post("/auth/reset-password", {resetToken, newPassword});
    return respone.data.data
}