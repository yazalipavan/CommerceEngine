import { CookieOptions } from "express";

export function createRefreshTokenCookieOptions(
  expiresAt: Date,
): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/v1/auth/refresh",
    expires: expiresAt,
  };
}
