export enum ErrorMessageKey {
    UNKNOWN = 'UNKNOWN',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USERS_EMPTY = 'USERS_EMPTY',
    TOKEN_IS_INVALID = 'TOKEN_IS_INVALID',
}

export type ErrorMessageT = {
    [key in ErrorMessageKey]: {
        code: number;
        message: string;
    }
}
