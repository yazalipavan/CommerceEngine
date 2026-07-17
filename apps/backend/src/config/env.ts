const config = Object.freeze({
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.LOG_LEVEL,
});

export default config;
