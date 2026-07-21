import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  PORT: z.coerce.number(),

  //   DATABASE_URL: z.string(),

  //   JWT_ACCESS_SECRET: z.string().min(32),

  //   JWT_REFRESH_SECRET: z.string().min(32),

  //   JWT_ACCESS_EXPIRES_IN: z.string(),

  //   JWT_REFRESH_EXPIRES_IN: z.string(),

  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid Environment Variables");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;
export default env;
