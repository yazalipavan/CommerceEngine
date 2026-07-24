import env from "./env.js";

export const config = {
  app: {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
  },

  database: {
    url: env.DATABASE_URL,
  },

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,

    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
    rememberMeRefreshExpiresIn: env.JWT_REMEMBER_ME_REFRESH_EXPIRES_IN,
  },

  logger: {
    level: env.LOG_LEVEL,
  },
} as const;
