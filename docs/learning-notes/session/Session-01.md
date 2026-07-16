# Session 1 - Learning Notes

---

# Monorepo

## Definition

A monorepo is a single Git repository that contains multiple related applications and shared packages.

## Why?

- Easier code sharing
- Single version control
- Centralized dependency management
- Easier refactoring across projects
- Consistent tooling

## Typical Structure

apps/
packages/
docs/

## Benefits

- Shared utilities
- Shared configurations
- Easier collaboration
- Single CI/CD pipeline
- Better dependency management

## Challenges

- Larger repository
- Proper workspace configuration required
- Build optimization becomes important as the project grows

---

# pnpm

## Definition

pnpm is a fast and disk-space-efficient JavaScript package manager.

## Why use pnpm?

- Faster installs
- Saves disk space
- Strict dependency management
- Excellent monorepo support

## Key Features

- Symlink-based dependency management
- Shared package store
- Workspaces
- Fast installation

---

# pnpm Workspace

## Definition

A pnpm Workspace allows multiple packages/applications to be managed within a single repository.

## Requirements

1. Root package.json
2. pnpm-workspace.yaml
3. Workspace packages

## Important

There is no separate command to initialize a workspace.

pnpm automatically detects the workspace.

---

# package.json

## Purpose

Describes a Node.js package or application.

## Contains

- Name
- Version
- Scripts
- Dependencies
- Dev Dependencies
- Package Metadata

## Root package.json

Acts as the workspace root.

Usually contains

- Common scripts
- Tooling
- Workspace configuration

## Application package.json

Each application maintains its own dependencies and scripts.

---

# Runtime Dependency

Required while the application is running.

Examples

- express
- mongoose

---

# Development Dependency

Required only during development.

Examples

- typescript
- tsx
- eslint
- prettier
- @types/node

---

# private: true

Purpose

Prevents accidental publishing of the package to npm.

Recommended for workspace roots.

---

# Versioning

Semantic Versioning (SemVer)

MAJOR.MINOR.PATCH

Example

1.0.0

Major → Breaking changes

Minor → New features

Patch → Bug fixes
