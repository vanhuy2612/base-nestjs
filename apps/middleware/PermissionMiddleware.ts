import { RequestT } from "@root/libs/core/request";
import { ResponseT } from "@root/libs/core/response";
import { NextFunction } from "express";
import { Auth } from "../modules/auth/auth";

export const PermissionMiddleware = (permission: string) => {
  return (req: RequestT, res: ResponseT, next: NextFunction) => {
    const auth: Auth = req.auth as Auth;
    const permissions: string[] = auth.permissions || [];
    if (!permissions.includes(permission)) {
      res.status(403).json({
        statusCode: 403,
        message: "Permission Denied"
      });
    };
    next();
  };
}