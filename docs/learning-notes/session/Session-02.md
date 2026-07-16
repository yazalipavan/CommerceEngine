# Session 2 - Learning Notes

---

# Modular Monolith

## Definition

A Modular Monolith is a single application divided into independent business modules.

## Characteristics

- Single deployment
- Single codebase
- Independent modules
- Clear module boundaries

## Advantages

- Easier debugging
- Easier testing
- Easier deployment
- Future migration to microservices

---

# Feature-based Architecture

## Definition

Organizing code by business features instead of technical layers.

Example

Auth

Products

Orders

Payments

Each feature contains everything related to itself.

## Benefits

- High cohesion
- Low coupling
- Easier maintenance
- Easier scalability

---

# Separation of Concerns

## Definition

Each component should have one clearly defined responsibility.

Example

server.ts

Starts the server.

app.ts

Configures the Express application.

Business Logic

Lives inside services.

---

# app.ts

## Responsibility

Configure the Express application.

Typical Responsibilities

- Create Express instance
- Register middleware
- Register routes

Should NOT

- Start the server
- Connect databases directly
- Execute business logic

---

# server.ts

## Responsibility

Start the HTTP server.

Typical Responsibilities

- Read port
- Start listening
- Handle graceful shutdown (later)

Should NOT

- Configure routes
- Implement business logic

---

# tsconfig.json

Configuration file used by the TypeScript compiler.

---

## target

Specifies the JavaScript version generated after compilation.

Example

ES2022

---

## module

Defines the JavaScript module system.

Common Values

- CommonJS
- ESNext
- NodeNext

---

## moduleResolution

Defines how imports are resolved.

Common Values

- Node
- NodeNext

---

## rootDir

Specifies the source directory.

Example

src

---

## outDir

Specifies where compiled JavaScript files are generated.

Example

dist

---

## strict

Enables strict type checking.

Recommended to always keep enabled.

Benefits

- Better type safety
- Early error detection
- Cleaner code

---

## esModuleInterop

Allows cleaner interoperability between CommonJS and ES Modules.

Example

Instead of

import \* as express from "express"

You can write

import express from "express"

---

## skipLibCheck

Skips type checking of declaration files.

Benefits

- Faster compilation

---

# Express Application

Created using

express()

Represents the entire web application.

Responsibilities

- Register middleware
- Register routes
- Configure application behavior

---

# Middleware

A function executed during the request-response lifecycle.

Common Uses

- Authentication
- Logging
- Validation
- Error Handling
- Parsing Request Body

---

# express.json()

Built-in middleware.

Purpose

Parses incoming JSON request bodies.

Makes data available through

req.body

---

# Health Check Endpoint

Purpose

Allows external systems to verify whether the application is running correctly.

Common Uses

- Load Balancers
- Kubernetes
- Monitoring Systems
- Health Checks

Typical Endpoint

GET /health

## Questions to Revisit

- Why did we choose NodeNext instead of CommonJS?
- When should a module have its own subfolders?
- What additional compiler options exist in tsconfig.json?
- What is the complete Express request lifecycle?
