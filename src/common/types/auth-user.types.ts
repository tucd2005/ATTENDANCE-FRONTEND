import { RoleEnum } from "./index";

export interface RegisterPayload {
	role: RoleEnum;
	email: string;
	password: string;
	fullname: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface UserResponse {
	_id: string;
	role: RoleEnum;
	email: string;
	fullname: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken?: string;
	user: UserResponse;
}

