export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}
