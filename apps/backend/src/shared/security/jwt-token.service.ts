import { SignJWT, jwtVerify } from "jose";

import { TextEncoder } from "util";

import { config } from "@/config/index.js";

import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenResult,
} from "./types/token-payload.js";

import { ITokenService } from "./interfaces/token-service.interface.js";

const accessSecret = new TextEncoder().encode(config.jwt.accessSecret);

const refreshSecret = new TextEncoder().encode(config.jwt.refreshSecret);

export class JwtTokenService implements ITokenService {
  async generateAccessToken(payload: AccessTokenPayload): Promise<TokenResult> {
    const token = await new SignJWT(payload)

      .setProtectedHeader({
        alg: "HS256",
      })

      .setIssuedAt()

      .setExpirationTime(config.jwt.accessExpiresIn)

      .sign(accessSecret);
    const expiresAt = new Date(
      Date.now() + parseInt(config.jwt.accessExpiresIn) * 24 * 60 * 60 * 1000,
    );
    return { token, expiresAt };
  }

  async generateRefreshToken(
    payload: RefreshTokenPayload,
    rememberMe: boolean,
  ): Promise<TokenResult> {
    const duration = rememberMe
      ? config.jwt.rememberMeRefreshExpiresIn
      : config.jwt.refreshExpiresIn;

    const expiresAt = new Date(
      Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000,
    );
    const token = await new SignJWT(payload)

      .setProtectedHeader({
        alg: "HS256",
      })

      .setIssuedAt()

      .setExpirationTime(duration)

      .sign(refreshSecret);
    return { token, expiresAt };
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    const { payload } = await jwtVerify<AccessTokenPayload>(
      token,
      accessSecret,
    );

    return payload;
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    const { payload } = await jwtVerify<RefreshTokenPayload>(
      token,
      refreshSecret,
    );

    return payload;
  }
}
