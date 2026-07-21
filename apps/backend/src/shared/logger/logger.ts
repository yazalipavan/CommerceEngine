import pino from "pino";
import { config } from "@/config/index.js";

export const loggerOptions: pino.LoggerOptions = {
  level: config.logger.level,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: "commerce-engine",
  },
};

if (config.app.nodeEnv === "development") {
  loggerOptions.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  };
}

export const logger = pino(loggerOptions);
