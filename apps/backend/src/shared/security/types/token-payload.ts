import { JWTPayload } from "jose";

export interface AccessTokenPayload extends JWTPayload {
  sub: string; //UserID
  email: string;
  roles: string[];
}

export interface RefreshTokenPayload extends JWTPayload {
  sub: string; //UserID
  tokenId: string;
  rememberMe: boolean;
}

export interface TokenResult {
  token: string;
  expiresAt: Date;
}
