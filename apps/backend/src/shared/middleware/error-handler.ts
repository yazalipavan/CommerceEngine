import { NextFunction, Request, Response } from "express";

import { AppError, ErrorCode } from "@/shared/errors/index.js";
import { logger } from "@/shared/logger/logger.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    logger.warn(
      {
        code: error.code,
        details: error.details,
      },
      error.message,
    );

    return res.status(error.statusCode).json({
      success: false,

      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  logger.error(error);

  return res.status(500).json({
    success: false,

    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    },
  });
}
