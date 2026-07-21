import { PrismaClient } from "@/generated/prisma/client.js";
import { config } from "@/config/index.js";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      config.app.nodeEnv === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

if (config.app.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}
