import { RefreshToken } from "@/generated/prisma/client.js";

export interface IRefreshTokenRepository {
  upsert(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;

  findByUserId(userId: string): Promise<RefreshToken | null>;

  deleteByUserId(userId: string): Promise<void>;
}
