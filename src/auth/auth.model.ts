export interface SessionToken {
    access_token: string;
}

export interface IAuthSignUpSuccessResponse {
    access_token: string;
}

export interface IAuthSignInSuccessResponse {
    access_token: string;
}

export interface SessionPayload {
    id: string;
    email: string;
}