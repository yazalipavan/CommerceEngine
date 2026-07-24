import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenResult,
} from "../types/token-payload.js";

export interface ITokenService {
  generateAccessToken(payload: AccessTokenPayload): Promise<TokenResult>;

  generateRefreshToken(
    payload: RefreshTokenPayload,
    rememberMe: boolean,
  ): Promise<TokenResult>;

  verifyAccessToken(token: string): Promise<AccessTokenPayload>;

  verifyRefreshToken(token: string): Promise<RefreshTokenPayload>;
}
