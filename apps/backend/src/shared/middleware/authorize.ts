import { NextFunction, Request, Response } from "express";
import { AppError, ErrorCode } from "@/shared/errors/index.js";

export class AuthorizeMiddleware {
  handle(...allowedRoles: string[]) {
    return (
      req: Request,

      res: Response,

      next: NextFunction,
    ) => {
      const user = req.user;

      if (!user) {
        return next(
          new AppError(
            "Authentication required.",

            401,

            ErrorCode.UNAUTHORIZED,
          ),
        );
      }

      const authorized = user.roles.some((role) => allowedRoles.includes(role));

      if (!authorized) {
        return next(
          new AppError(
            "Access denied.",

            403,

            ErrorCode.FORBIDDEN,
          ),
        );
      }

      next();
    };
  }
}
