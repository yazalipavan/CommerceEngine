import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { AppError, ErrorCode } from "@/shared/errors/index.js";

export function validateRequest<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Request validation failed",
          400,
          ErrorCode.VALIDATION_ERROR,
          result.error.flatten(),
        ),
      );
    }

    req.body = result.data;

    next();
  };
}
