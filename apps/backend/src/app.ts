import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { logger } from "@/shared/logger/logger.js";
import { errorHandler } from "@/shared/middleware/error-handler.js";
import { notFoundHandler } from "@/shared/middleware/not-found.js";
import healthModule from "./modules/health/index.js";

export function createApp() {
  const app = express();

  // Security
  app.use(helmet());

  // CORS
  app.use(cors());

  // Compression
  app.use(compression());

  // Body Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookies
  app.use(cookieParser());

  // HTTP Request Logging
  app.use(
    pinoHttp({
      logger,
    }),
  );

  // Health Check
  app.use(healthModule);

  // 404 Handler
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
