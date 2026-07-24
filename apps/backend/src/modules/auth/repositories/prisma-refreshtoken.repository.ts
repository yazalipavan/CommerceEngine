import { PrismaClient, RefreshToken } from "@/generated/prisma/client.js";

import { prisma } from "@/shared/database/prisma.js";
import { IRefreshTokenRepository } from "@/modules/auth/interfaces/refreshtoken-repository.interface.js";

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async upsert(
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<void> {
    await prisma.refreshToken.upsert({
      where: {
        userId,
      },

      update: {
        tokenHash,
        expiresAt,
      },

      create: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async findByUserId(userId: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: {
        userId,
      },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: {
        userId,
      },
    });
  }
}
