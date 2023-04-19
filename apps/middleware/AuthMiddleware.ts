import { HttpStatus, Injectable } from '@nestjs/common';
import Env from '@root/libs/Env';
import { Auth } from '../modules/auth/common';
import { BaseMiddleware } from './BaseMiddleware';
import { to } from 'await-to-js';
import { RequestT } from '@root/libs/core/request';
import { ResponseT } from '@root/libs/core/response';
import { APIException } from '@root/libs/core/exception/APIException';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';

@Injectable()
export class AuthMiddleware extends BaseMiddleware {
  async use(req: RequestT, res: ResponseT, next: (error?: any) => void) {
    const bear: string = req.headers['authorization'] || '';
    const token: string = bear.replace(/Bearer /gi, '');

    try {
      const auth: Auth = this.jwtService.verify(token, {
        secret: Env.get('JWT_SECRET', 'nguoianhmuonquen'),
      });
      if (!auth.id) {
        throw new APIException(HttpStatus.UNAUTHORIZED, ErrorMessageKey.TOKEN_IS_INVALID);
      }
      // Save auth to req
      req.auth = auth;
      next();
    } catch (e) {
      throw new APIException(HttpStatus.UNAUTHORIZED, ErrorMessageKey.TOKEN_IS_INVALID);
    }
  }
}
