# Session 3 - Learning Notes

---

# Configuration

## Definition

Configuration is data that controls application behavior without requiring code changes.

## Examples

- Port
- Database URL
- JWT Secret
- API Keys
- Log Level

---

# Environment Variables

## Definition

Environment variables are key-value pairs provided to an application by its execution environment.

Example

PORT=3000

NODE_ENV=development

---

# process.env

## Definition

`process.env` is a Node.js object that exposes environment variables available to the running process.

## Important

- Provided by Node.js.
- Values are always strings.
- Does not automatically read `.env` files.

---

# .env File

## Definition

A local development file containing environment variables.

Example

PORT=3000

JWT_SECRET=my-secret

## Purpose

Simplifies local development.

---

# dotenv

## Definition

A library that reads `.env` files and loads them into `process.env`.

## Responsibilities

- Read `.env`
- Parse values
- Populate `process.env`

## Important

Node.js does not automatically load `.env`.

---

# .env.example

## Purpose

Documents required environment variables.

## Contains

- Keys
- Dummy values

## Never Contains

- Real secrets
- Passwords
- API Keys

---

# Configuration Module

## Purpose

Centralize access to application configuration.

Benefits

- Single source of truth
- Easy maintenance
- Easier validation
- Prevents scattered `process.env` usage

---

# Bootstrapping

## Definition

The initialization phase executed before the application starts serving requests.

Examples

- Load environment variables
- Validate configuration
- Connect database
- Initialize logging
- Connect Redis
- Start HTTP server

---

# Best Practices

- Never hardcode secrets.
- Commit `.env.example`, never `.env`.
- Read configuration from one module.
- Treat configuration as immutable.
- Keep initialization separate from business logic.

---

# Questions to Revisit

- What are the Twelve-Factor App principles?
- How are environment variables injected in Docker?
- How does Kubernetes manage Secrets?
- How should environment variables be validated?
- How do cloud providers manage secrets?
