# Sprint 0 - Session 2

## Goal

Initialize the backend application and create the first runnable service.

---

## Completed

- Configured pnpm workspace
- Initialized backend application
- Configured TypeScript
- Configured Express
- Established Modular Monolith folder structure
- Created Health module
- Implemented GET /health endpoint
- Successfully started the backend application

---

## Decisions Made

- Backend follows a Modular Monolith architecture.
- Each business capability will be implemented as an independent module.
- Modules expose functionality through an index.ts entry point.
- Shared functionality will live under the shared directory only when required.

---

## Learnings

- Difference between workspace package and application package.
- Separation of app.ts and server.ts.
- Why business modules own their own files.
- Why we avoid unnecessary abstractions.

---

## Next Session

- Project configuration
- Environment configuration
- Coding standards
- Logging strategy
