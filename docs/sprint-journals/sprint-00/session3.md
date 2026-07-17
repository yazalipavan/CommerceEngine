# Sprint 0 - Session 3

## Goal

Establish a centralized configuration system for the backend and remove hardcoded application configuration.

---

## Completed

- Added environment variable support using dotenv.
- Created `.env` for local development.
- Created `.env.example` for sharing required configuration.
- Centralized application configuration in `config/env.ts`.
- Removed hardcoded port from `server.ts`.
- Updated `.gitignore` to exclude environment files.
- Introduced the concept of application bootstrapping.
- Discussed the future startup lifecycle of the application.

---

## Key Decisions

- Application configuration should never be hardcoded.
- All modules should consume configuration from a single source.
- `.env` files are only for local development.
- Production environments should provide configuration through environment variables.
- Application startup will evolve through a dedicated bootstrap layer.

---

## Learnings

- Difference between `process.env` and `.env`.
- Why `dotenv` exists.
- Configuration should be immutable.
- Why initialization order matters with ES Modules.
- Difference between loading configuration and validating configuration.

---

## Next Session

- Environment validation
- Logging
- Error handling foundation
