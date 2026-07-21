import { createApp } from "./app.js";
import { config } from "./config/index.js";
import { logger } from "@/shared/logger/logger.js";

const app = createApp();
app.listen(config.app.port, () => {
  logger.info(`CommerceEngine Backend running on port ${config.app.port}`);
});
