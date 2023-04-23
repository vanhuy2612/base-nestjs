import { RequestT } from '@root/libs/core/request';
import { ResponseT } from '@root/libs/core/response';
import { NextFunction } from 'express';
import { Auth } from '../modules/auth/common';
import { APIException } from '@root/libs/core/exception/APIException';
import { HttpStatus } from '@nestjs/common';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';

export const PermissionMiddleware = (permission: string) => {
  return (req: RequestT, res: ResponseT, next: NextFunction) => {
    const auth: Auth = req.auth as Auth;
    const permissions: string[] = auth.permissions || [];
    if (!permissions.includes(permission)) {
      throw new APIException(
        HttpStatus.FORBIDDEN,
        ErrorMessageKey.PERMISSION_DENIED,
      );
    }
    next();
  };
};
