import { PrismaClient, User } from "@/generated/prisma/client.js";

import { prisma } from "@/shared/database/prisma.js";

import { IUserRepository } from "../interfaces/user-repository.interface.js";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}
