export enum ErrorMessageKey {
  UNKNOWN = 'UNKNOWN',
  TOO_MANY_REQUEST = 'TOO_MANY_REQUEST',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USERS_EMPTY = 'USERS_EMPTY',
  TOKEN_IS_INVALID = 'TOKEN_IS_INVALID',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export type ErrorMessageT = {
  [key in ErrorMessageKey]: {
    code: number;
    message: string;
  };
};
