import { UserStoreType } from '@/types/store/user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginAxiosType {
  Q: LoginRequest;
  S: LoginResponse;
}

export interface UserInfoRequest {
  token: string;
}

export type UserInfoResponse = UserStoreType;

export interface UserInfoAxiosType {
  Q: UserInfoRequest;
  S: UserInfoResponse;
}
