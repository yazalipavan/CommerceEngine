import { prisma } from "@/shared/database/prisma.js";
import { logger } from "@/shared/logger/logger.js";

export async function bootstrapDatabase(): Promise<void> {
  try {
    await prisma.$connect();

    logger.info(" Database connected");
  } catch (error) {
    logger.fatal(error, "Failed to connect to the database");

    process.exit(1);
  }
}
