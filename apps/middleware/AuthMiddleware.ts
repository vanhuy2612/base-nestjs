import { Injectable } from "@nestjs/common";
import Env from "@root/libs/Env";
import { Auth } from "../modules/auth/auth";
import { BaseMiddleware } from "./BaseMiddleware";
import { to } from 'await-to-js'
import { RequestT } from "@root/libs/core/request";
import { ResponseT } from "@root/libs/core/response";

@Injectable()
export class AuthMiddleware extends BaseMiddleware {
  async use(req: RequestT, res: ResponseT, next: (error?: any) => void) {
    const bear: string = req.headers["authorization"] || '';
    const token: string = bear.replace(/Bearer /gi, '');

    try {
      const auth: Auth = this.jwtService.verify(token, {
        secret: Env.get('JWT_SECRET', 'nguoianhmuonquen'),
      });
      if (!auth.id) res.status(401).json({
        statusCode: 401,
        message: "Token is invalid"
      });
      // Save auth to req
      req.auth = auth;
      next();
    } catch (e) {
      res.status(401).json({
        statusCode: 401,
        message: "Token is invalid"
      });
    }
  }
}